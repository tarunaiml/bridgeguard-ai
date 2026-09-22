import json
import os
import joblib

def load_model(model_path="ml/models/selected_model.pkl"):
    """Load the trained ML model."""
    if os.path.exists(model_path):
        return joblib.load(model_path)
    return None

def load_explainer(explainer_path="ml/models/shap_explainer.pkl"):
    """Load the pre-fitted SHAP explainer."""
    if os.path.exists(explainer_path):
        return joblib.load(explainer_path)
    return None

def generate_local_explanation(features, feature_names):
    """
    Generate SHAP explanation for a single prediction.
    features: list or array of health-relative features
    feature_names: list of feature names
    """
    model = load_model()
    explainer = load_explainer()
    
    if model is None or explainer is None:
        return {
            "status": "NOT_TRAINED",
            "message": "SHAP READY — WAITING FOR TRAINED MODEL"
        }
    
    # IMPORT SHAP ONLY WHEN NEEDED TO PREVENT DEPENDENCY ERRORS IF NOT INSTALLED
    try:
        import shap
    except ImportError:
        return {
            "status": "ERROR",
            "message": "SHAP library not installed."
        }
        
    try:
        # Calculate SHAP values
        shap_values = explainer.shap_values(features)
        
        # Format the output for the dashboard
        # This assumes a structure compatible with TreeExplainer or LinearExplainer
        
        if isinstance(shap_values, list):
            # For multi-class or some tree explainers
            shap_vals = shap_values[1][0] if len(shap_values) > 1 else shap_values[0][0]
        else:
            shap_vals = shap_values[0]
            
        base_value = explainer.expected_value
        if isinstance(base_value, (list, tuple)):
            base_value = base_value[1] if len(base_value) > 1 else base_value[0]
            
        contributions = []
        for i, name in enumerate(feature_names):
            contributions.append({
                "feature": name,
                "value": float(features[0][i]),
                "contribution": float(shap_vals[i])
            })
            
        # Sort by absolute contribution
        contributions.sort(key=lambda x: abs(x["contribution"]), reverse=True)
        
        return {
            "status": "EXPLAINABILITY_READY",
            "base_value": float(base_value),
            "contributions": contributions
        }
    except Exception as e:
        return {
            "status": "ERROR",
            "message": str(e)
        }

def generate_global_importance():
    """
    Load pre-calculated global SHAP feature importance from model training.
    """
    metrics_path = "ml/model_metrics.json"
    if os.path.exists(metrics_path):
        with open(metrics_path, 'r') as f:
            metrics = json.load(f)
            if "global_shap_importance" in metrics:
                return {
                    "status": "EXPLAINABILITY_READY",
                    "importance": metrics["global_shap_importance"]
                }
                
    return {
        "status": "NOT_TRAINED",
        "message": "SHAP READY — WAITING FOR TRAINED MODEL"
    }
