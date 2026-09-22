import numpy as np

def extract_health_relative_features(current_sensor_data, healthy_baseline):
    """
    Transform raw sensor data into health-relative features based on a healthy baseline.
    Different bridges have different normal ranges. A fixed rule (e.g., RMS > X) is not sufficient.
    """
    
    # Example logic for relative extraction:
    # z_feature = (current_feature - healthy_baseline_mean) / healthy_baseline_std
    
    relative_features = {}
    
    # Example feature normalizations
    if "rms_vibration" in current_sensor_data and "rms_mean" in healthy_baseline:
        # Normalized RMS deviation
        dev = (current_sensor_data["rms_vibration"] - healthy_baseline["rms_mean"]) / healthy_baseline["rms_std"]
        relative_features["normalized_rms_deviation"] = dev
        
    if "tilt" in current_sensor_data and "tilt_mean" in healthy_baseline:
        # Tilt deviation
        dev = current_sensor_data["tilt"] - healthy_baseline["tilt_mean"]
        relative_features["tilt_deviation"] = dev
        
    # Additional features to be implemented:
    # - Dominant frequency shift
    # - Peak acceleration relative scale
    # - Environmental compensation (e.g. Temp adjusted frequency)
    
    return relative_features
