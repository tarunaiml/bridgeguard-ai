import os
import json
import joblib
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Helper for resolving absolute paths safely in Vercel
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

def get_model_path(filename):
    return os.path.join(BASE_DIR, "models", filename)

def load_model():
    path = get_model_path("selected_model.pkl")
    if os.path.exists(path):
        return joblib.load(path)
    return None

def get_or_create_explainer(model):
    try:
        import shap
    except ImportError:
        return None
        
    model_name = type(model).__name__
    tree_models = ["RandomForestClassifier", "DecisionTreeClassifier", "XGBClassifier", "GradientBoostingClassifier"]
    linear_models = ["LogisticRegression", "LinearSVC"]
    
    if model_name in tree_models:
        return shap.TreeExplainer(model)
    elif model_name in linear_models:
        dummy_background = np.zeros((1, getattr(model, 'n_features_in_', 24)))
        return shap.LinearExplainer(model, dummy_background)
    else:
        dummy_background = np.zeros((1, getattr(model, 'n_features_in_', 24)))
        return shap.Explainer(model.predict, dummy_background)

def generate_local_explanation(features, feature_names):
    model = load_model()
    if model is None:
        return {"status": "NOT_TRAINED", "message": "SHAP READY — WAITING FOR TRAINED MODEL"}
        
    explainer = get_or_create_explainer(model)
    if explainer is None:
        return {"status": "ERROR", "message": "Could not create SHAP explainer or SHAP not installed."}
        
    try:
        features_arr = np.array(features)
        prediction = int(model.predict(features_arr)[0])
        probability = float(model.predict_proba(features_arr)[0][1]) if hasattr(model, "predict_proba") else None
        
        shap_values = explainer.shap_values(features_arr)
        
        if isinstance(shap_values, list):
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
            
        contributions.sort(key=lambda x: abs(x["contribution"]), reverse=True)
        
        return {
            "status": "EXPLAINABILITY_READY",
            "prediction": prediction,
            "probability": probability,
            "base_value": float(base_value),
            "contributions": contributions
        }
    except Exception as e:
        return {"status": "ERROR", "message": str(e)}

@app.route('/', methods=['GET'])
def root():
    return jsonify({
        "service": "BridgeGuard ML API",
        "status": "ok"
    })

@app.route('/health', methods=['GET'])
def health():
    model = load_model()
    return jsonify({
        "status": "ok",
        "service": "BridgeGuard ML",
        "shap": True,
        "model_loaded": model is not None
    })

@app.route('/api/model-info', methods=['GET'])
def model_info():
    metadata_path = get_model_path("model_metadata.json")
    if os.path.exists(metadata_path):
        with open(metadata_path, 'r') as f:
            meta = json.load(f)
        return jsonify({
            "trained": True,
            "model": meta.get("selected_model"),
            "features": meta.get("feature_names"),
            "baseline": meta.get("baseline")
        })
    return jsonify({"trained": False})

@app.route('/api/explain', methods=['POST'])
def explain():
    data = request.json
    if not data or 'features' not in data:
        return jsonify({"status": "ERROR", "message": "Missing features in request"})
        
    current_sensor_data = data.get('features')
    
    metadata_path = get_model_path("model_metadata.json")
    if not os.path.exists(metadata_path):
        return jsonify({"status": "NOT_TRAINED", "message": "SHAP READY — WAITING FOR TRAINED MODEL"})
        
    with open(metadata_path, 'r') as f:
        meta = json.load(f)
        
    baseline_mean = meta.get("baseline", {}).get("mean", {})
    baseline_std = meta.get("baseline", {}).get("std", {})
    feature_names = meta.get("feature_names", [])
    
    feature_vector = []
    for fn in feature_names:
        val = current_sensor_data.get(fn, 0.0)
        mean_val = baseline_mean.get(fn, 0.0)
        std_val = baseline_std.get(fn, 1e-6)
        normalized_val = (val - mean_val) / std_val
        feature_vector.append(normalized_val)
        
    features_array = [feature_vector]
    explanation = generate_local_explanation(features_array, feature_names)
    
    return jsonify(explanation)

# Expose app for Vercel
# Vercel reads `app` from here.

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
