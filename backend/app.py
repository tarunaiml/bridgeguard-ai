import os
import json
import sqlite3
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

def get_db_path():
    return os.path.join(BASE_DIR, "bridgeguard.db")

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
            "contributions": contributions,
            "model_name": type(model).__name__
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
    db_exists = os.path.exists(get_db_path())
    return jsonify({
        "status": "ok",
        "service": "BridgeGuard ML",
        "shap": True,
        "model_loaded": model is not None,
        "database_connected": db_exists
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
            "selection_rationale": meta.get("selection_rationale"),
            "features": meta.get("feature_names"),
            "baseline": meta.get("baseline"),
            "metrics": meta.get("metrics"),
            "all_results": meta.get("all_results")
        })
    return jsonify({"trained": False})

@app.route('/api/models-comparison', methods=['GET'])
def models_comparison():
    metadata_path = get_model_path("model_metadata.json")
    if os.path.exists(metadata_path):
        with open(metadata_path, 'r') as f:
            meta = json.load(f)
        return jsonify({
            "status": "ok",
            "dataset": meta.get("dataset"),
            "task": meta.get("task"),
            "split_method": meta.get("split_method"),
            "train_samples": meta.get("train_samples"),
            "test_samples": meta.get("test_samples"),
            "selected_model": meta.get("selected_model"),
            "selection_rationale": meta.get("selection_rationale"),
            "candidate_models": meta.get("candidate_models_detailed", {}),
            "summary_table": meta.get("all_results", {})
        })
    return jsonify({"status": "NOT_TRAINED", "message": "No model comparison data available"})

@app.route('/api/scenarios-coverage', methods=['GET'])
def scenarios_coverage():
    db_path = get_db_path()
    if os.path.exists(db_path):
        try:
            conn = sqlite3.connect(db_path)
            c = conn.cursor()
            
            total = c.execute("SELECT COUNT(*) FROM scenarios").fetchone()[0]
            real_cnt = c.execute("SELECT COUNT(*) FROM scenarios WHERE sample_count_real > 0").fetchone()[0]
            syn_cnt = c.execute("SELECT COUNT(*) FROM scenarios WHERE sample_count_synthetic > 0").fetchone()[0]
            both_cnt = c.execute("SELECT COUNT(*) FROM scenarios WHERE coverage_status = 'both'").fetchone()[0]
            uncal_cnt = c.execute("SELECT COUNT(*) FROM scenarios WHERE calibration_status LIKE 'uncalibrated%'").fetchone()[0]
            
            scenarios = []
            for row in c.execute("SELECT id, bridge_type, traffic_level, environmental_condition, coverage_status, calibration_status, sample_count_real, sample_count_synthetic FROM scenarios").fetchall():
                scenarios.append({
                    "scenario_id": row[0],
                    "bridge_type": row[1],
                    "traffic_level": row[2],
                    "environmental_condition": row[3],
                    "coverage_status": row[4],
                    "calibration_status": row[5],
                    "sample_count_real": row[6],
                    "sample_count_synthetic": row[7]
                })
            conn.close()
            
            return jsonify({
                "status": "ok",
                "summary": {
                    "total_scenarios": total,
                    "real_data_scenarios": real_cnt,
                    "synthetic_data_scenarios": syn_cnt,
                    "both_real_and_synthetic": both_cnt,
                    "uncalibrated_insufficient_evidence": uncal_cnt,
                    "calibrated_percentage": round(((total - uncal_cnt) / total) * 100, 1)
                },
                "scenarios": scenarios
            })
        except Exception as e:
            return jsonify({"status": "ERROR", "message": str(e)}), 500
            
    # Fallback to JSON file if db query fails
    cov_path = os.path.join(BASE_DIR, "scenarios_coverage.json")
    if os.path.exists(cov_path):
        with open(cov_path) as f:
            return jsonify(json.load(f))
            
    return jsonify({"status": "UNAVAILABLE", "message": "Coverage data not found"})

@app.route('/api/datasets-provenance', methods=['GET'])
def datasets_provenance():
    db_path = get_db_path()
    if os.path.exists(db_path):
        try:
            conn = sqlite3.connect(db_path)
            c = conn.cursor()
            
            datasets = []
            query = """
                SELECT d.id, b.name, b.location, b.country, b.bridge_type, d.title, d.doi, 
                       d.source_institution, d.citation, d.raw_data_accessible, d.sampling_frequency_hz, 
                       d.duration_seconds, d.data_origin, b.status
                FROM datasets d
                LEFT JOIN bridges b ON d.bridge_id = b.id
            """
            for row in c.execute(query).fetchall():
                datasets.append({
                    "dataset_id": row[0],
                    "bridge_name": row[1],
                    "location": row[2],
                    "country": row[3],
                    "bridge_type": row[4],
                    "dataset_title": row[5],
                    "doi": row[6],
                    "institution": row[7],
                    "citation": row[8],
                    "raw_data_accessible": bool(row[9]),
                    "sampling_frequency_hz": row[10],
                    "duration_seconds": row[11],
                    "data_origin": row[12],
                    "bridge_status": row[13]
                })
            conn.close()
            return jsonify({"status": "ok", "datasets": datasets})
        except Exception as e:
            return jsonify({"status": "ERROR", "message": str(e)}), 500
            
    return jsonify({"status": "UNAVAILABLE", "message": "Database not found"})

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

# Expose app for Vercel zero-config Python deployment
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
