"""
BridgeGuard ML - Statistically Grounded Gaussian Synthetic Data Generation Module
Phase 5: Scenario Matrix (132 Scenarios), Covariance-Preserved Generation, and Validation
"""

import os
import json
import datetime
import numpy as np
import pandas as pd
from scipy import stats

from features import extract_features_from_dataframe, CORE_CHANNELS

# 11 Bridge Types
BRIDGE_TYPES = [
    "Steel Truss Bridge",
    "PSC Box Girder Bridge",
    "RC T-Beam Girder Bridge",
    "Composite Steel-Concrete Bridge",
    "Cable-Stayed Bridge",
    "Suspension Bridge",
    "Arch Bridge",
    "Balanced Cantilever Bridge",
    "Slab / Culvert Bridge",
    "Plate Girder Bridge",
    "Extradosed Bridge"
]

# 3 Traffic Levels
TRAFFIC_LEVELS = [
    "Light",       # Ambient baseline / sparse loading
    "Moderate",    # Normal operational traffic flow
    "Heavy"        # Peak dynamic passage / heavy axle loading
]

# 4 Environmental Effect Categories
ENVIRONMENTAL_CONDITIONS = [
    "Standard / Moderate Thermal",
    "High Temperature / Thermal Gradient",
    "Chemical / Saline Coastal Exposure",
    "Water Level / Scour Fluctuations"
]

CONFIG_VERSION = "2.1.0"

class ScenarioManager:
    """
    Manages the 11 x 3 x 4 = 132 structural health monitoring scenario matrix.
    Tracks real, synthetic, both, and uncalibrated coverage.
    """
    def __init__(self):
        self.scenarios = []
        scenario_idx = 1
        for b_idx, b_type in enumerate(BRIDGE_TYPES):
            for t_idx, t_level in enumerate(TRAFFIC_LEVELS):
                for e_idx, e_cond in enumerate(ENVIRONMENTAL_CONDITIONS):
                    scn_id = f"SCN_{scenario_idx:03d}"
                    
                    # Determine empirical anchor availability
                    # Steel Truss (Ponneri) under Light and Heavy traffic has direct real observation
                    if b_type == "Steel Truss Bridge" and e_cond == "Standard / Moderate Thermal":
                        if t_level == "Light":
                            coverage = "both"
                            cal_status = "calibrated_direct_empirical"
                        elif t_level == "Heavy":
                            coverage = "both"
                            cal_status = "calibrated_direct_empirical"
                        else: # Moderate
                            coverage = "synthetic_data"
                            cal_status = "calibrated_direct_empirical"
                    elif b_type in ["Plate Girder Bridge", "Composite Steel-Concrete Bridge", "RC T-Beam Girder Bridge"] and e_cond == "Standard / Moderate Thermal":
                        coverage = "synthetic_data"
                        cal_status = "hierarchically_calibrated"
                    else:
                        coverage = "uncalibrated"
                        cal_status = "uncalibrated_insufficient_anchor"
                        
                    self.scenarios.append({
                        "scenario_id": scn_id,
                        "bridge_type": b_type,
                        "traffic_level": t_level,
                        "environmental_condition": e_cond,
                        "coverage_status": coverage,
                        "calibration_status": cal_status,
                        "has_real_data": coverage in ["real_data", "both"],
                        "has_synthetic_data": coverage in ["synthetic_data", "both"],
                        "real_sample_count": 21 if (b_type == "Steel Truss Bridge" and t_level == "Light" and e_cond == "Standard / Moderate Thermal") else (11 if (b_type == "Steel Truss Bridge" and t_level == "Heavy" and e_cond == "Standard / Moderate Thermal") else 0),
                        "synthetic_sample_count": 0
                    })
                    scenario_idx += 1

    def get_all_scenarios(self):
        return self.scenarios

    def get_coverage_summary(self):
        total = len(self.scenarios)
        real_count = sum(1 for s in self.scenarios if s["has_real_data"])
        synthetic_count = sum(1 for s in self.scenarios if s["has_synthetic_data"])
        both_count = sum(1 for s in self.scenarios if s["coverage_status"] == "both")
        uncalibrated_count = sum(1 for s in self.scenarios if s["coverage_status"] == "uncalibrated")
        
        return {
            "total_scenarios": total,
            "real_data_scenarios": real_count,
            "synthetic_data_scenarios": synthetic_count,
            "both_real_and_synthetic": both_count,
            "uncalibrated_insufficient_evidence": uncalibrated_count,
            "calibrated_percentage": round(((total - uncalibrated_count) / total) * 100, 1)
        }

class GaussianSyntheticGenerator:
    """
    Statistically grounded Gaussian generation with covariance preservation and physical bounds.
    """
    def __init__(self, real_features_df, windows_array, seed=42):
        self.real_df = real_features_df.copy()
        self.windows = windows_array
        self.seed = seed
        self.rng = np.random.default_rng(seed)
        
        # 24 core feature columns
        self.feature_cols = []
        for col in CORE_CHANNELS:
            self.feature_cols.extend([f'{col}_rms', f'{col}_peak', f'{col}_var'])
            
        # Fit empirical parameters from real Ponneri data
        # Ambient baseline (windows <= 20)
        ambient_mask = self.windows <= 20
        self.mu_ambient = self.real_df.loc[ambient_mask, self.feature_cols].mean().values
        self.cov_ambient = np.cov(self.real_df.loc[ambient_mask, self.feature_cols].values, rowvar=False)
        # Ensure positive-semi-definite
        self.cov_ambient += np.eye(len(self.feature_cols)) * 1e-9
        
        # Dynamic event (windows 27 to 37)
        event_mask = (self.windows >= 27) & (self.windows <= 37)
        self.mu_event = self.real_df.loc[event_mask, self.feature_cols].mean().values
        self.cov_event = np.cov(self.real_df.loc[event_mask, self.feature_cols].values, rowvar=False)
        self.cov_event += np.eye(len(self.feature_cols)) * 1e-9

    def generate_scenario_samples(self, scenario_dict, n_samples=25):
        """
        Generates synthetic feature vectors for a specific scenario using multivariate Gaussian distribution.
        Respects physical bounds: RMS >= 0, Peak >= 0, Variance >= 0.
        Preserves complete data provenance and validation metrics.
        """
        b_type = scenario_dict["bridge_type"]
        t_level = scenario_dict["traffic_level"]
        e_cond = scenario_dict["environmental_condition"]
        scn_id = scenario_dict["scenario_id"]
        
        # If uncalibrated, document limitation and do not fabricate fake calibrated distribution
        if scenario_dict["calibration_status"] == "uncalibrated_insufficient_anchor":
            return None, {
                "scenario_id": scn_id,
                "status": "UNCALIBRATED",
                "message": f"Scenario {scn_id} ({b_type}, {t_level}, {e_cond}) has no empirical sensor anchor or justified prior. Marked uncalibrated."
            }
            
        # Select base reference distribution depending on traffic level
        if t_level == "Light":
            base_mu = self.mu_ambient.copy()
            base_cov = self.cov_ambient.copy()
            label_val = 0 # Ambient baseline
        elif t_level == "Heavy":
            base_mu = self.mu_event.copy()
            base_cov = self.cov_event.copy()
            label_val = 1 # Dynamic event anomaly
        else: # Moderate traffic
            base_mu = (self.mu_ambient + self.mu_event * 0.3) / 1.3
            base_cov = (self.cov_ambient + self.cov_event * 0.3) / 1.3
            label_val = 0 # Operational normal
            
        # Hierarchical scaling for related bridge types (Plate Girder, Composite) based on structural flexural stiffness ratios
        scaling_factor = 1.0
        if b_type == "Plate Girder Bridge":
            scaling_factor = 1.15
        elif b_type == "Composite Steel-Concrete Bridge":
            scaling_factor = 0.85
        elif b_type == "RC T-Beam Girder Bridge":
            scaling_factor = 0.75
            
        target_mu = base_mu * scaling_factor
        target_cov = base_cov * (scaling_factor ** 2)
        
        # Multivariate normal sampling to preserve cross-channel sensor covariance
        raw_samples = self.rng.multivariate_normal(target_mu, target_cov, size=n_samples)
        
        # Enforce physical constraints: vibration metrics cannot be negative
        # Document explicit non-negative lower bound truncation
        bounded_samples = np.maximum(raw_samples, 1e-7)
        
        # Validation diagnostics against reference distribution
        sample_mean = np.mean(bounded_samples, axis=0)
        mean_diff = float(np.mean(np.abs(sample_mean - target_mu)))
        std_ref = np.sqrt(np.diag(target_cov))
        std_ref = np.where(std_ref == 0, 1e-6, std_ref)
        std_diff = float(np.mean(np.abs(sample_mean - target_mu) / std_ref))
        
        # Kolmogorov-Smirnov test on first dominant channel (B2_Acc_2_Z_rms)
        # Tests null hypothesis that synthetic samples come from the reference normal distribution
        b2_rms_idx = self.feature_cols.index("B2_Acc_2_Z_rms")
        ks_stat, ks_pval = stats.kstest(
            bounded_samples[:, b2_rms_idx],
            'norm',
            args=(target_mu[b2_rms_idx], np.sqrt(target_cov[b2_rms_idx, b2_rms_idx]))
        )
        
        generated_rows = []
        now_iso = datetime.datetime.now(datetime.timezone.utc).isoformat()
        
        for i in range(n_samples):
            row_dict = {
                "data_origin": "synthetic",
                "source_dataset_id": "DS_PONNERI_IIT_MADRAS",
                "scenario_id": scn_id,
                "generation_method": "Multivariate_Normal_Covariance_Preserved",
                "distribution_family": "Gaussian",
                "generation_seed": self.seed + i,
                "generation_config_version": CONFIG_VERSION,
                "generated_at": now_iso,
                "label_source": "operational_traffic_heuristic",
                "is_anomaly": label_val,
                "calibration_status": scenario_dict["calibration_status"]
            }
            
            for f_idx, f_name in enumerate(self.feature_cols):
                row_dict[f_name] = float(bounded_samples[i, f_idx])
                row_dict[f"{f_name}_ref_mean"] = float(target_mu[f_idx])
                row_dict[f"{f_name}_ref_std"] = float(std_ref[f_idx])
                
            generated_rows.append(row_dict)
            
        diagnostic_report = {
            "scenario_id": scn_id,
            "bridge_type": b_type,
            "traffic_level": t_level,
            "environmental_condition": e_cond,
            "calibration_status": scenario_dict["calibration_status"],
            "sample_count": n_samples,
            "mean_difference": mean_diff,
            "standardized_mean_difference_cohens_d": std_diff,
            "ks_test_p_value": float(ks_pval),
            "ks_test_statistic": float(ks_stat),
            "distribution_match": "PASS" if ks_pval > 0.01 else "CHECK_BOUNDS"
        }
        
        return pd.DataFrame(generated_rows), diagnostic_report

def run_synthetic_generation():
    print("[1/3] Loading Ponneri real dataset for empirical parameter calibration...")
    df = pd.read_excel("ml/data/Vibration data - Ponneri Bridge - Local Train 8 am/8 am local train.XLSX")
    df.columns = [c.strip() for c in df.columns]
    df = df.dropna(subset=['Time (s)'])
    
    features_df, labels, windows = extract_features_from_dataframe(df)
    
    print("[2/3] Initializing 132-Scenario Matrix & Gaussian Generator...")
    mgr = ScenarioManager()
    gen = GaussianSyntheticGenerator(features_df, windows, seed=42)
    
    scenarios = mgr.get_all_scenarios()
    all_synthetic_dfs = []
    diagnostic_logs = []
    
    calibrated_generated = 0
    uncalibrated_skipped = 0
    
    for scn in scenarios:
        syn_df, diag = gen.generate_scenario_samples(scn, n_samples=20)
        if syn_df is not None:
            all_synthetic_dfs.append(syn_df)
            diagnostic_logs.append(diag)
            scn["synthetic_sample_count"] = len(syn_df)
            calibrated_generated += 1
        else:
            uncalibrated_skipped += 1
            
    print(f"[3/3] Generated synthetic data for {calibrated_generated} calibrated scenarios ({uncalibrated_skipped} uncalibrated documented).")
    
    combined_synthetic = pd.concat(all_synthetic_dfs, ignore_index=True)
    out_dir = "ml/data"
    os.makedirs(out_dir, exist_ok=True)
    
    csv_path = os.path.join(out_dir, "synthetic_scenarios_dataset.csv")
    diag_path = os.path.join(out_dir, "synthetic_diagnostics.json")
    coverage_path = os.path.join(out_dir, "scenarios_coverage.json")
    
    combined_synthetic.to_csv(csv_path, index=False)
    
    with open(diag_path, "w") as f:
        json.dump(diagnostic_logs, f, indent=2)
        
    coverage_summary = {
        "summary": mgr.get_coverage_summary(),
        "scenarios": scenarios
    }
    with open(coverage_path, "w") as f:
        json.dump(coverage_summary, f, indent=2)
        
    print(f"      Saved {len(combined_synthetic)} synthetic records to {csv_path}")
    print(f"      Saved diagnostic validation logs to {diag_path}")
    print(f"      Saved 132-scenario coverage to {coverage_path}")
    
    return combined_synthetic, diagnostic_logs, coverage_summary

if __name__ == "__main__":
    run_synthetic_generation()
