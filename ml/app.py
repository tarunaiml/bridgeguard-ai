import os
import json
from flask import Flask, request, jsonify
from flask_cors import CORS
from explain import generate_local_explanation, generate_global_importance

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/', methods=['GET'])
def root():
    return jsonify({
        "status": "ok",
        "service": "BridgeGuard ML API Root"
    })

@app.route('/api/model-info', methods=['GET'])
def model_info():
    metadata_path = os.path.join(os.path.dirname(__file__), "models", "model_metadata.json")
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

@app.route('/api/predict', methods=['POST'])
def predict():
    # In the future, this will use the trained model
    data = request.json
    
    # Check if a model exists
    model_path = os.path.join(os.path.dirname(__file__), "models", "selected_model.pkl")
    if not os.path.exists(model_path):
        return jsonify({
            "status": "NOT_TRAINED",
            "message": "Real ML prediction will appear after the selected model is trained and validated.",
            "prediction": None
        })
        
    return jsonify({
        "status": "ERROR",
        "message": "Model loading implemented but model file is invalid or missing."
    })

@app.route('/api/explain', methods=['POST'])
def explain():
    data = request.json
    if not data or 'features' not in data:
        return jsonify({"status": "ERROR", "message": "Missing features in request"})
        
    current_sensor_data = data.get('features')
    
    metadata_path = os.path.join(os.path.dirname(__file__), "models", "model_metadata.json")
    if not os.path.exists(metadata_path):
        return jsonify({"status": "NOT_TRAINED", "message": "SHAP READY — WAITING FOR TRAINED MODEL"})
        
    with open(metadata_path, 'r') as f:
        meta = json.load(f)
        
    baseline_mean = meta.get("baseline", {}).get("mean", {})
    baseline_std = meta.get("baseline", {}).get("std", {})
    feature_names = meta.get("feature_names", [])
    
    # Process features exactly like train.py
    # If the UI sends raw sensor values, we extract them. 
    # For now, let's assume the UI sends the exact feature dict.
    
    feature_vector = []
    for fn in feature_names:
        # Check if UI sent the raw un-normalized feature
        val = current_sensor_data.get(fn, 0.0)
        # Normalize
        mean_val = baseline_mean.get(fn, 0.0)
        std_val = baseline_std.get(fn, 1e-6)
        normalized_val = (val - mean_val) / std_val
        feature_vector.append(normalized_val)
        
    features_array = [feature_vector]
    
    # Call the explainer
    explanation = generate_local_explanation(features_array, feature_names)
    
    # Include the global importance as well for the dashboard if available
    global_imp = generate_global_importance()
    if global_imp.get("status") == "EXPLAINABILITY_READY":
        explanation["global_importance"] = global_imp.get("importance")
        
    return jsonify(explanation)

@app.route('/health', methods=['GET'])
def root_health():
    return jsonify({
        "status": "ok",
        "service": "BridgeGuard ML",
        "shap": True
    })

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({"status": "ok", "message": "BridgeGuard ML Python Backend is running."})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
