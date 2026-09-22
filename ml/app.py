import os
import json
from flask import Flask, request, jsonify
from flask_cors import CORS
from explain import generate_local_explanation, generate_global_importance
from features import extract_health_relative_features

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/', methods=['GET'])
def root():
    return jsonify({
        "status": "ok",
        "service": "BridgeGuard ML API Root"
    })

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
    
    # Example Baseline (In a real scenario, this is fetched from a database or config for the specific bridge)
    baseline = {
        "rms_mean": 1.0, 
        "rms_std": 0.5, 
        "tilt_mean": 0.0,
        "tilt_std": 1.0
    }
    
    # Preprocessing: Convert to health-relative features
    # Note: features.py handles this
    try:
        relative_features = extract_health_relative_features(current_sensor_data, baseline)
    except Exception as e:
        return jsonify({"status": "ERROR", "message": f"Feature extraction failed: {str(e)}"})
        
    # We must pass the exact ordered array of features the model expects
    # In the prototype, we expect these names:
    feature_names = ["normalized_rms_deviation", "tilt_deviation"]
    
    feature_vector = []
    for fn in feature_names:
        feature_vector.append(relative_features.get(fn, 0.0))
        
    features_array = [feature_vector]
    
    # Call the explainer
    explanation = generate_local_explanation(features_array, feature_names)
    
    # Include the global importance as well for the dashboard
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
