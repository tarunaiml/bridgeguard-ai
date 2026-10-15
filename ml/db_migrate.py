"""
BridgeGuard ML - Database Schema and Migration Script
Phase 6: Relational schema in SQLite preserving bridges, datasets, sensor channels,
scenarios, feature windows, models, evaluations, and synthetic generation logs.
"""

import os
import json
import sqlite3
import datetime
import pandas as pd

from dataset_audit import DATASET_AUDIT
from synthetic_generator import ScenarioManager
from features import extract_features_from_dataframe, CORE_CHANNELS

SCHEMA_SQL = """
-- Bridges entity
CREATE TABLE IF NOT EXISTS bridges (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    location TEXT,
    country TEXT,
    bridge_type TEXT,
    material TEXT,
    span_meters REAL,
    status TEXT,
    created_at TEXT
);

-- Datasets and provenance
CREATE TABLE IF NOT EXISTS datasets (
    id TEXT PRIMARY KEY,
    bridge_id TEXT,
    title TEXT NOT NULL,
    doi TEXT,
    source_institution TEXT,
    license TEXT,
    citation TEXT,
    raw_data_accessible INTEGER,
    sampling_frequency_hz REAL,
    duration_seconds REAL,
    data_origin TEXT,
    created_at TEXT,
    FOREIGN KEY (bridge_id) REFERENCES bridges(id)
);

-- Sensor channels
CREATE TABLE IF NOT EXISTS sensor_channels (
    id TEXT PRIMARY KEY,
    dataset_id TEXT,
    channel_name TEXT NOT NULL,
    sensor_type TEXT,
    axis TEXT,
    unit TEXT,
    location_description TEXT,
    FOREIGN KEY (dataset_id) REFERENCES datasets(id)
);

-- 132 Scenario Matrix
CREATE TABLE IF NOT EXISTS scenarios (
    id TEXT PRIMARY KEY,
    bridge_type TEXT NOT NULL,
    traffic_level TEXT NOT NULL,
    environmental_condition TEXT NOT NULL,
    coverage_status TEXT NOT NULL,
    calibration_status TEXT NOT NULL,
    sample_count_real INTEGER DEFAULT 0,
    sample_count_synthetic INTEGER DEFAULT 0
);

-- Windowed Features (Real and Synthetic)
CREATE TABLE IF NOT EXISTS feature_windows (
    id TEXT PRIMARY KEY,
    dataset_id TEXT,
    scenario_id TEXT,
    window_index INTEGER,
    time_start_s REAL,
    time_end_s REAL,
    data_origin TEXT NOT NULL,
    is_anomaly INTEGER NOT NULL,
    features_json TEXT NOT NULL,
    created_at TEXT,
    FOREIGN KEY (dataset_id) REFERENCES datasets(id),
    FOREIGN KEY (scenario_id) REFERENCES scenarios(id)
);

-- ML Models
CREATE TABLE IF NOT EXISTS ml_models (
    id TEXT PRIMARY KEY,
    model_name TEXT NOT NULL,
    algorithm_family TEXT,
    hyperparameters_json TEXT,
    selected_flag INTEGER DEFAULT 0,
    selection_rationale TEXT,
    trained_at TEXT
);

-- Model Evaluations on Held-out Real Test Set
CREATE TABLE IF NOT EXISTS model_evaluations (
    id TEXT PRIMARY KEY,
    model_id TEXT,
    dataset_id TEXT,
    split_method TEXT,
    train_sample_count INTEGER,
    test_sample_count INTEGER,
    accuracy REAL,
    precision REAL,
    recall REAL,
    f1_score REAL,
    confusion_matrix_json TEXT,
    training_time_ms REAL,
    inference_time_ms REAL,
    evaluated_at TEXT,
    FOREIGN KEY (model_id) REFERENCES ml_models(id),
    FOREIGN KEY (dataset_id) REFERENCES datasets(id)
);

-- Synthetic Generation Provenance Logs
CREATE TABLE IF NOT EXISTS synthetic_generation_logs (
    id TEXT PRIMARY KEY,
    scenario_id TEXT,
    generation_method TEXT,
    distribution_family TEXT,
    sample_count INTEGER,
    generation_seed INTEGER,
    reference_dataset_id TEXT,
    mean_difference REAL,
    standardized_difference REAL,
    ks_p_value REAL,
    calibration_status TEXT,
    generated_at TEXT,
    FOREIGN KEY (scenario_id) REFERENCES scenarios(id)
);
"""

def migrate_database(db_path="ml/data/bridgeguard.db"):
    os.makedirs(os.path.dirname(db_path), exist_ok=True)
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    print(f"[1/6] Initializing database schema at {db_path}...")
    cursor.executescript(SCHEMA_SQL)
    conn.commit()
    
    print("[2/6] Populating bridges and audited datasets...")
    now_iso = datetime.datetime.now(datetime.timezone.utc).isoformat()
    
    # Insert Ponneri Bridge
    ponneri = DATASET_AUDIT["verified_active_dataset"]
    cursor.execute("""
        INSERT OR REPLACE INTO bridges (id, name, location, country, bridge_type, material, span_meters, status, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, ("BRIDGE_PONNERI_01", "Ponneri Bridge", ponneri["location"], "India", ponneri["bridge_type"], "Steel", 30.0, "active_monitored", now_iso))
    
    cursor.execute("""
        INSERT OR REPLACE INTO datasets (id, bridge_id, title, doi, source_institution, license, citation, raw_data_accessible, sampling_frequency_hz, duration_seconds, data_origin, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (ponneri["id"], "BRIDGE_PONNERI_01", ponneri["name"], ponneri["doi"], ponneri["institution"], "CC-BY 4.0", ponneri["citation"], 1, ponneri["sampling_frequency_hz"], ponneri["duration_seconds"], "real", now_iso))
    
    # Insert investigated leads and benchmarks
    for lead in DATASET_AUDIT["investigated_leads"]:
        b_id = f"BRIDGE_{lead['id']}"
        cursor.execute("""
            INSERT OR REPLACE INTO bridges (id, name, location, country, bridge_type, material, span_meters, status, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (b_id, lead["name"], lead["location"], "India", lead["bridge_type"], "Composite", None, "audited_literature", now_iso))
        
        cursor.execute("""
            INSERT OR REPLACE INTO datasets (id, bridge_id, title, doi, source_institution, license, citation, raw_data_accessible, sampling_frequency_hz, duration_seconds, data_origin, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (lead["id"], b_id, lead["name"], lead["doi"], lead["institution"], "Restricted / Proprietary", lead["citation"], 0, None, None, "real", now_iso))
        
    for bench in DATASET_AUDIT["verified_road_bridge_benchmarks"]:
        b_id = f"BRIDGE_{bench['id']}"
        cursor.execute("""
            INSERT OR REPLACE INTO bridges (id, name, location, country, bridge_type, material, span_meters, status, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (b_id, bench["name"], bench["location"], "International", bench["bridge_type"], "Steel", None, "benchmark_verified", now_iso))
        
        cursor.execute("""
            INSERT OR REPLACE INTO datasets (id, bridge_id, title, doi, source_institution, license, citation, raw_data_accessible, sampling_frequency_hz, duration_seconds, data_origin, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (bench["id"], b_id, bench["name"], bench["doi"], bench["institution"], "Open Access", bench["citation"], 1, bench.get("sampling_frequency_hz"), None, "real", now_iso))

    # Sensor channels for Ponneri
    channel_details = [
        ("A1_Acc_1_Y", "Accelerometer A1", "Y", "g", "Midspan bottom chord web (Y-axis)"),
        ("A2_Acc_1_x", "Accelerometer A1", "X", "g", "Midspan bottom chord web (X-axis)"),
        ("A3_Acc_1_Z", "Accelerometer A1", "Z", "g", "Midspan bottom chord web (Z-axis)"),
        ("A4_Acc2_Y", "Accelerometer A2", "Y", "g", "4.55m from midspan web (Y-axis)"),
        ("B1_Acc_2_X", "Accelerometer A2", "X", "g", "4.55m from midspan web (X-axis)"),
        ("B2_Acc_2_Z", "Accelerometer A2", "Z", "g", "4.55m from midspan web (Z-axis)"),
        ("B3_Acc_3_Y", "Accelerometer A3", "Y", "g", "Deck level bracket (Y-axis)"),
        ("B4_Acc3_X", "Accelerometer A3", "X", "g", "Deck level bracket (X-axis)")
    ]
    for ch_name, s_type, axis, unit, loc in channel_details:
        ch_id = f"CH_{ponneri['id']}_{ch_name}"
        cursor.execute("""
            INSERT OR REPLACE INTO sensor_channels (id, dataset_id, channel_name, sensor_type, axis, unit, location_description)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        """, (ch_id, ponneri["id"], ch_name, s_type, axis, unit, loc))
        
    print("[3/6] Populating 132-Scenario Matrix...")
    mgr = ScenarioManager()
    for scn in mgr.get_all_scenarios():
        cursor.execute("""
            INSERT OR REPLACE INTO scenarios (id, bridge_type, traffic_level, environmental_condition, coverage_status, calibration_status, sample_count_real, sample_count_synthetic)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """, (scn["scenario_id"], scn["bridge_type"], scn["traffic_level"], scn["environmental_condition"], scn["coverage_status"], scn["calibration_status"], scn["real_sample_count"], scn["synthetic_sample_count"]))
        
    print("[4/6] Ingesting Real Feature Windows from Ponneri Bridge...")
    raw_file = "ml/data/Vibration data - Ponneri Bridge - Local Train 8 am/8 am local train.XLSX"
    if os.path.exists(raw_file):
        df = pd.read_excel(raw_file)
        features_df, labels, windows = extract_features_from_dataframe(df)
        
        for idx, row in features_df.iterrows():
            w_idx = int(row["Window"])
            is_anomaly = int(labels[idx])
            scn_id = "SCN_003" if is_anomaly == 1 else "SCN_001" # Heavy vs Light Steel Truss
            
            feat_dict = {c: float(row[c]) for c in features_df.columns if c not in ["Window", "Time_Start", "Time_End", "Sample_Count"]}
            win_id = f"WIN_REAL_{w_idx:04d}"
            
            cursor.execute("""
                INSERT OR REPLACE INTO feature_windows (id, dataset_id, scenario_id, window_index, time_start_s, time_end_s, data_origin, is_anomaly, features_json, created_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (win_id, ponneri["id"], scn_id, w_idx, float(row["Time_Start"]), float(row["Time_End"]), "real", is_anomaly, json.dumps(feat_dict), now_iso))

    print("[5/6] Ingesting Synthetic Feature Windows and Diagnostics...")
    syn_csv = "ml/data/synthetic_scenarios_dataset.csv"
    diag_json = "ml/data/synthetic_diagnostics.json"
    
    if os.path.exists(syn_csv):
        syn_df = pd.read_csv(syn_csv)
        for idx, row in syn_df.iterrows():
            s_id = row["scenario_id"]
            win_id = f"WIN_SYN_{s_id}_{idx:04d}"
            is_anomaly = int(row["is_anomaly"])
            
            feat_dict = {c: float(row[c]) for c in CORE_CHANNELS for c in [f'{c}_rms', f'{c}_peak', f'{c}_var']}
            cursor.execute("""
                INSERT OR REPLACE INTO feature_windows (id, dataset_id, scenario_id, window_index, time_start_s, time_end_s, data_origin, is_anomaly, features_json, created_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (win_id, ponneri["id"], s_id, idx, None, None, "synthetic", is_anomaly, json.dumps(feat_dict), row["generated_at"]))
            
    if os.path.exists(diag_json):
        with open(diag_json) as f:
            diags = json.load(f)
        for idx, d in enumerate(diags):
            log_id = f"LOG_SYN_{d['scenario_id']}_{idx:03d}"
            cursor.execute("""
                INSERT OR REPLACE INTO synthetic_generation_logs (id, scenario_id, generation_method, distribution_family, sample_count, generation_seed, reference_dataset_id, mean_difference, standardized_difference, ks_p_value, calibration_status, generated_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (log_id, d["scenario_id"], "Multivariate_Normal_Covariance_Preserved", "Gaussian", d["sample_count"], 42, ponneri["id"], d["mean_difference"], d["standardized_mean_difference_cohens_d"], d["ks_test_p_value"], d["calibration_status"], now_iso))

    print("[6/6] Populating ML Models and Evaluation Metrics...")
    meta_json = "ml/models/model_metadata.json"
    if os.path.exists(meta_json):
        with open(meta_json) as f:
            meta = json.load(f)
            
        selected_model_name = meta.get("selected_model")
        for m_name, m_info in meta.get("candidate_models_detailed", {}).items():
            m_id = f"MDL_{m_name.upper().replace(' ', '_')}"
            is_selected = 1 if m_name == selected_model_name else 0
            
            cursor.execute("""
                INSERT OR REPLACE INTO ml_models (id, model_name, algorithm_family, hyperparameters_json, selected_flag, selection_rationale, trained_at)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            """, (m_id, m_name, m_info.get("family"), json.dumps(m_info.get("hyperparameters", {})), is_selected, meta.get("selection_rationale") if is_selected else None, now_iso))
            
            eval_id = f"EVAL_{m_id}_{ponneri['id']}"
            cursor.execute("""
                INSERT OR REPLACE INTO model_evaluations (id, model_id, dataset_id, split_method, train_sample_count, test_sample_count, accuracy, precision, recall, f1_score, confusion_matrix_json, training_time_ms, inference_time_ms, evaluated_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (eval_id, m_id, ponneri["id"], meta.get("split_method"), meta.get("train_samples"), meta.get("test_samples"), m_info["accuracy"], m_info["precision"], m_info["recall"], m_info["f1_score"], json.dumps(m_info["confusion_matrix"]), m_info["training_time_ms"], m_info["inference_time_ms"], now_iso))
            
    conn.commit()
    conn.close()
    
    # Also replicate to backend/bridgeguard.db so the Flask server can query it
    backend_db_path = "backend/bridgeguard.db"
    os.makedirs(os.path.dirname(backend_db_path), exist_ok=True)
    import shutil
    shutil.copyfile(db_path, backend_db_path)
    print(f"      Replicated database to {backend_db_path}")
    print("Database migration successfully completed!")

if __name__ == "__main__":
    migrate_database()
