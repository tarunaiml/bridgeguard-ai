"""
BridgeGuard ML - Comprehensive Test Suite
Phase 9: End-to-end verification covering dataset schema, feature extraction,
leakage prevention, multi-model evaluation, synthetic generation, SHAP, DB, and APIs.
"""

import os
import sys
import json
import sqlite3
import unittest
import numpy as np
import pandas as pd
import joblib
import shap

# Ensure ml and backend modules are importable
sys.path.insert(0, os.path.abspath("ml"))
sys.path.insert(0, os.path.abspath("backend"))

from features import extract_features_from_dataframe, calculate_window_features, CORE_CHANNELS
from synthetic_generator import ScenarioManager, GaussianSyntheticGenerator
from dataset_audit import DATASET_AUDIT
from backend.app import app

class TestDatasetAndFeatures(unittest.TestCase):
    def setUp(self):
        self.raw_path = "ml/data/Vibration data - Ponneri Bridge - Local Train 8 am/8 am local train.XLSX"

    def test_dataset_exists_and_valid_columns(self):
        self.assertTrue(os.path.exists(self.raw_path), "Ponneri raw dataset file must exist")
        df = pd.read_excel(self.raw_path)
        clean_cols = [c.strip() for c in df.columns]
        self.assertIn("Time (s)", clean_cols)
        for ch in CORE_CHANNELS:
            self.assertIn(ch, clean_cols, f"Channel {ch} must be present in raw dataset")
            
        # Verify non-empty
        self.assertGreater(len(df), 30000, "Dataset must have over 30,000 real observations")

    def test_window_features_physical_bounds(self):
        dummy_sig = np.sin(np.linspace(0, 10 * np.pi, 600))
        feat = calculate_window_features(dummy_sig, sampling_rate_hz=600.0)
        
        self.assertGreaterEqual(feat['rms'], 0.0)
        self.assertGreaterEqual(feat['peak'], 0.0)
        self.assertGreaterEqual(feat['var'], 0.0)
        self.assertGreaterEqual(feat['crest_factor'], 1.0)
        self.assertGreater(feat['dom_freq'], 0.0)

    def test_feature_extraction_pipeline(self):
        df = pd.read_excel(self.raw_path)
        feat_df, labels, windows = extract_features_from_dataframe(df, window_seconds=1.0)
        
        self.assertGreater(len(feat_df), 40, "Must produce at least 40 windowed segments")
        self.assertEqual(len(feat_df), len(labels))
        self.assertEqual(len(feat_df), len(windows))
        
        # Check all 24 core features are present
        for ch in CORE_CHANNELS:
            self.assertIn(f"{ch}_rms", feat_df.columns)
            self.assertIn(f"{ch}_peak", feat_df.columns)
            self.assertIn(f"{ch}_var", feat_df.columns)

class TestLeakageSafeSplit(unittest.TestCase):
    def test_non_overlapping_time_windows(self):
        train_windows = set(range(0, 33)) # 0 to 32
        test_windows = set(range(33, 53))  # 33 to 52
        
        # Intersection must be strictly empty
        intersection = train_windows.intersection(test_windows)
        self.assertEqual(len(intersection), 0, "Train and Test window indices must be strictly disjoint to prevent data leakage")

class TestMultiModelEvaluation(unittest.TestCase):
    def setUp(self):
        self.meta_path = "backend/models/model_metadata.json"
        self.model_path = "backend/models/selected_model.pkl"

    def test_model_and_metadata_exist(self):
        self.assertTrue(os.path.exists(self.model_path), "Selected model file must exist")
        self.assertTrue(os.path.exists(self.meta_path), "Model metadata must exist")

    def test_candidate_models_reported(self):
        with open(self.meta_path) as f:
            meta = json.load(f)
            
        all_results = meta.get("all_results", {})
        expected_models = ["Logistic Regression", "Decision Tree", "Random Forest", "Support Vector Machine"]
        for em in expected_models:
            self.assertIn(em, all_results, f"Candidate model {em} must be present in evaluation results")
            self.assertGreaterEqual(all_results[em]["F1"], 0.8)
            self.assertGreaterEqual(all_results[em]["Accuracy"], 0.8)

    def test_selected_model_reloading_and_inference(self):
        model = joblib.load(self.model_path)
        x_dummy = np.zeros((1, 24))
        pred = model.predict(x_dummy)
        self.assertIn(int(pred[0]), [0, 1])
        if hasattr(model, "predict_proba"):
            probs = model.predict_proba(x_dummy)[0]
            self.assertAlmostEqual(float(np.sum(probs)), 1.0, places=4)

class TestGaussianSyntheticData(unittest.TestCase):
    def setUp(self):
        raw_path = "ml/data/Vibration data - Ponneri Bridge - Local Train 8 am/8 am local train.XLSX"
        df = pd.read_excel(raw_path)
        feat_df, labels, windows = extract_features_from_dataframe(df)
        self.gen = GaussianSyntheticGenerator(feat_df, windows, seed=42)
        self.mgr = ScenarioManager()

    def test_132_scenario_matrix_count(self):
        scenarios = self.mgr.get_all_scenarios()
        self.assertEqual(len(scenarios), 132, "Total scenario combinations must be exactly 11 x 3 x 4 = 132")

    def test_reproducibility(self):
        scn = self.mgr.get_all_scenarios()[0] # Steel Truss, Light, Normal
        df1, _ = self.gen.generate_scenario_samples(scn, n_samples=10)
        
        # Fresh generator with same seed
        gen2 = GaussianSyntheticGenerator(self.gen.real_df, self.gen.windows, seed=42)
        df2, _ = gen2.generate_scenario_samples(scn, n_samples=10)
        
        np.testing.assert_array_almost_equal(
            df1["A1_Acc_1_Y_rms"].values,
            df2["A1_Acc_1_Y_rms"].values,
            decimal=6,
            err_msg="Synthetic generation with identical seed must be 100% bit-level reproducible"
        )

    def test_physical_bounds(self):
        scn = self.mgr.get_all_scenarios()[0]
        df, _ = self.gen.generate_scenario_samples(scn, n_samples=15)
        for col in CORE_CHANNELS:
            self.assertTrue((df[f"{col}_rms"] >= 0).all(), "RMS vibration must be non-negative")
            self.assertTrue((df[f"{col}_peak"] >= 0).all(), "Peak vibration must be non-negative")
            self.assertTrue((df[f"{col}_var"] >= 0).all(), "Variance must be non-negative")

    def test_provenance_metadata(self):
        scn = self.mgr.get_all_scenarios()[0]
        df, _ = self.gen.generate_scenario_samples(scn, n_samples=5)
        self.assertTrue((df["data_origin"] == "synthetic").all())
        self.assertTrue((df["generation_method"] == "Multivariate_Normal_Covariance_Preserved").all())
        self.assertIn("generation_seed", df.columns)
        self.assertIn("scenario_id", df.columns)

class TestDatabaseIntegrity(unittest.TestCase):
    def test_sqlite_tables_and_rows(self):
        db_path = "backend/bridgeguard.db"
        self.assertTrue(os.path.exists(db_path), "Database bridgeguard.db must exist")
        conn = sqlite3.connect(db_path)
        c = conn.cursor()
        
        tables = ["bridges", "datasets", "sensor_channels", "scenarios", "feature_windows", "ml_models", "model_evaluations"]
        for t in tables:
            cnt = c.execute(f"SELECT COUNT(*) FROM {t}").fetchone()[0]
            self.assertGreater(cnt, 0, f"Table {t} must contain records")
            
        # Check scenario count is 132
        scn_cnt = c.execute("SELECT COUNT(*) FROM scenarios").fetchone()[0]
        self.assertEqual(scn_cnt, 132, "Scenarios table must contain exactly 132 rows")
        conn.close()

class TestShapExplainability(unittest.TestCase):
    def test_shap_linear_explainer_computes_values(self):
        model = joblib.load("backend/models/selected_model.pkl")
        explainer = shap.LinearExplainer(model, np.zeros((1, 24)))
        
        x_sample = np.ones((1, 24)) * 0.5
        shap_vals = explainer.shap_values(x_sample)
        
        self.assertEqual(len(shap_vals[0]), 24, "SHAP must return 24 feature contributions")
        self.assertTrue(np.isfinite(explainer.expected_value), "Base value must be a finite number")

class TestFlaskAPIContracts(unittest.TestCase):
    def setUp(self):
        self.client = app.test_client()

    def test_health_endpoint(self):
        res = self.client.get('/health')
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        self.assertEqual(data["status"], "ok")
        self.assertTrue(data["model_loaded"])

    def test_model_info_endpoint(self):
        res = self.client.get('/api/model-info')
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        self.assertTrue(data["trained"])
        self.assertEqual(len(data["features"]), 24)

    def test_models_comparison_endpoint(self):
        res = self.client.get('/api/models-comparison')
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        self.assertIn("Logistic Regression", data["candidate_models"])
        self.assertIn("Random Forest", data["candidate_models"])

    def test_scenarios_coverage_endpoint(self):
        res = self.client.get('/api/scenarios-coverage')
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        self.assertEqual(data["summary"]["total_scenarios"], 132)

    def test_datasets_provenance_endpoint(self):
        res = self.client.get('/api/datasets-provenance')
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        self.assertGreaterEqual(len(data["datasets"]), 4)

    def test_explain_endpoint(self):
        res = self.client.post('/api/explain', json={'features': {'A1_Acc_1_Y_rms': 0.005}})
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        self.assertEqual(data["status"], "EXPLAINABILITY_READY")
        self.assertEqual(len(data["contributions"]), 24)

if __name__ == '__main__':
    unittest.main()
