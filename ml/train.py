import pandas as pd
import numpy as np
import joblib
import json
import os
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC
from sklearn.ensemble import RandomForestClassifier, IsolationForest

def extract_features(df):
    """Extract features for each 1-second window (non-overlapping for simplicity)"""
    df['Window'] = (df['Time (s)'] // 1).astype(int)
    
    features = []
    labels = []
    windows = []
    
    # We define Train Passage (Anomaly) as Window 27 to 37
    for window, group in df.groupby('Window'):
        if len(group) < 100: continue # Skip partial windows
        
        feat_dict = {'Window': window}
        
        for col in group.columns:
            if col in ['Time (s)', 'Window']: continue
            
            sig = group[col].values
            feat_dict[f'{col}_rms'] = np.sqrt(np.mean(sig**2))
            feat_dict[f'{col}_peak'] = np.max(np.abs(sig))
            feat_dict[f'{col}_var'] = np.var(sig)
            
        features.append(feat_dict)
        # Label: 1 if train is passing, 0 if ambient
        labels.append(1 if 27 <= window <= 37 else 0)
        windows.append(window)
        
    features_df = pd.DataFrame(features)
    return features_df, np.array(labels), np.array(windows)

def train_and_evaluate():
    print("Loading Ponneri Bridge dataset...")
    file_path = "ml/data/Vibration data - Ponneri Bridge - Local Train 8 am/8 am local train.XLSX"
    df = pd.read_excel(file_path)
    df.columns = [c.strip() for c in df.columns]
    df = df.dropna()
    
    print("Extracting features...")
    features_df, labels, windows = extract_features(df)
    
    feature_cols = [c for c in features_df.columns if c != 'Window']
    
    print("Calculating healthy baseline (Ambient windows 0-20)...")
    ambient_mask = windows <= 20
    baseline_mean = features_df.loc[ambient_mask, feature_cols].mean()
    baseline_std = features_df.loc[ambient_mask, feature_cols].std()
    
    # Avoid div by zero
    baseline_std = baseline_std.replace(0, 1e-6)
    
    # Health-relative features (normalized to baseline)
    X_relative = (features_df[feature_cols] - baseline_mean) / baseline_std
    
    # Time-based split to prevent leakage
    # Train: Windows <= 32 (Contains ambient + first half of train passage)
    # Test: Windows > 32 (Contains second half of train passage + ambient)
    train_mask = windows <= 32
    test_mask = windows > 32
    
    X_train, y_train = X_relative.loc[train_mask], labels[train_mask]
    X_test, y_test = X_relative.loc[test_mask], labels[test_mask]
    
    models = {
        "Logistic Regression": LogisticRegression(random_state=42),
        "SVM": SVC(probability=True, random_state=42),
        "Random Forest": RandomForestClassifier(n_estimators=100, random_state=42),
        "Isolation Forest": IsolationForest(contamination=0.2, random_state=42)
    }
    
    results = {}
    best_f1 = -1
    best_model_name = ""
    best_model = None
    
    print("\nModel Comparison (Strict time-based split):")
    for name, model in models.items():
        if name == "Isolation Forest":
            # Train only on normal data for IF
            X_train_normal = X_train[y_train == 0]
            model.fit(X_train_normal)
            preds = model.predict(X_test)
            # Isolation forest returns -1 for anomaly, 1 for normal
            # Convert to our labels: 1 for anomaly, 0 for normal
            preds = np.where(preds == -1, 1, 0)
        else:
            model.fit(X_train, y_train)
            preds = model.predict(X_test)
            
        acc = accuracy_score(y_test, preds)
        prec = precision_score(y_test, preds, zero_division=0)
        rec = recall_score(y_test, preds, zero_division=0)
        f1 = f1_score(y_test, preds, zero_division=0)
        
        results[name] = {"Accuracy": acc, "Precision": prec, "Recall": rec, "F1": f1}
        print(f"{name} -> F1: {f1:.4f} | Acc: {acc:.4f} | Prec: {prec:.4f} | Rec: {rec:.4f}")
        
        if f1 > best_f1:
            best_f1 = f1
            best_model_name = name
            best_model = model
            
    print(f"\nSelected Model: {best_model_name} (F1: {best_f1:.4f})")
    
    os.makedirs("ml/models", exist_ok=True)
    joblib.dump(best_model, "ml/models/selected_model.pkl")
    
    metadata = {
        "dataset": "Ponneri Bridge - Local Train",
        "task": "Operational State Detection (Train Passage)",
        "selected_model": best_model_name,
        "feature_names": feature_cols,
        "baseline": {
            "mean": baseline_mean.to_dict(),
            "std": baseline_std.to_dict()
        },
        "metrics": results[best_model_name],
        "all_results": results
    }
    
    with open("ml/models/model_metadata.json", "w") as f:
        json.dump(metadata, f, indent=2)
        
    print(f"Model saved to ml/models/selected_model.pkl (Size: {os.path.getsize('ml/models/selected_model.pkl')} bytes)")

if __name__ == "__main__":
    train_and_evaluate()
