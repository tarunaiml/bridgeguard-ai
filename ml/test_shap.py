import unittest
from explain import generate_local_explanation, generate_global_importance
from features import extract_health_relative_features

class TestExplainability(unittest.TestCase):
    
    def test_missing_model_handling(self):
        # 5. Missing model is handled gracefully.
        features = [[1.0, 0.5]]
        feature_names = ["normalized_rms", "tilt_deviation"]
        
        result = generate_local_explanation(features, feature_names)
        
        self.assertEqual(result["status"], "NOT_TRAINED")
        self.assertIn("WAITING FOR TRAINED MODEL", result["message"])
        
    def test_global_importance_missing(self):
        result = generate_global_importance()
        self.assertEqual(result["status"], "NOT_TRAINED")

    def test_health_relative_features(self):
        # 8. The same preprocessing pipeline is used
        current = {"rms_vibration": 1.5, "tilt": 2.1}
        baseline = {"rms_mean": 1.0, "rms_std": 0.5, "tilt_mean": 2.0}
        
        rel = extract_health_relative_features(current, baseline)
        self.assertEqual(rel["normalized_rms_deviation"], 1.0)
        self.assertAlmostEqual(rel["tilt_deviation"], 0.1)

if __name__ == '__main__':
    unittest.main()
