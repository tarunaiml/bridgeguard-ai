"""
BridgeGuard ML - Feature Extraction Module
Calculates physical and health-relative vibration features from sensor time-series.
"""

import numpy as np
import pandas as pd

CORE_CHANNELS = [
    'A1_Acc_1_Y', 'A2_Acc_1_x', 'A3_Acc_1_Z', 'A4_Acc2_Y',
    'B1_Acc_2_X', 'B2_Acc_2_Z', 'B3_Acc_3_Y', 'B4_Acc3_X'
]

def calculate_window_features(signal_segment, sampling_rate_hz=600.0):
    """
    Computes rigorous vibration metrics for a single 1D signal window:
    - RMS (Root Mean Square energy)
    - Peak absolute amplitude
    - Variance
    - Standard deviation
    - Crest factor (Peak / RMS)
    - Dominant frequency (via FFT spectral peak)
    """
    sig = np.asarray(signal_segment, dtype=float)
    if len(sig) == 0:
        return {
            'rms': 0.0, 'peak': 0.0, 'var': 0.0,
            'std': 0.0, 'crest_factor': 1.0, 'dom_freq': 0.0
        }
    
    rms = float(np.sqrt(np.mean(sig ** 2)))
    peak = float(np.max(np.abs(sig)))
    var = float(np.var(sig))
    std = float(np.std(sig))
    crest_factor = float(peak / (rms + 1e-9)) if rms > 1e-9 else 1.0
    
    # FFT for dominant frequency
    n = len(sig)
    fft_vals = np.abs(np.fft.rfft(sig - np.mean(sig)))
    freqs = np.fft.rfftfreq(n, d=1.0 / sampling_rate_hz)
    
    dom_freq = float(freqs[np.argmax(fft_vals)]) if len(fft_vals) > 0 else 0.0
    
    return {
        'rms': rms,
        'peak': peak,
        'var': var,
        'std': std,
        'crest_factor': crest_factor,
        'dom_freq': dom_freq
    }

def extract_features_from_dataframe(df, window_seconds=1.0, sampling_rate_hz=600.0, min_samples=300):
    """
    Extracts time-windowed features across all sensor channels.
    Returns:
    - features_df: DataFrame with both core 24 features (_rms, _peak, _var) and extended features
    - labels: 1 for dynamic/anomaly window, 0 for normal baseline
    - windows: window index array
    """
    df = df.copy()
    df.columns = [c.strip() for c in df.columns]
    df = df.dropna(subset=['Time (s)'])
    
    df['Window'] = (df['Time (s)'] // window_seconds).astype(int)
    
    records = []
    labels = []
    windows = []
    
    channel_cols = [c for c in CORE_CHANNELS if c in df.columns]
    
    for window_idx, group in df.groupby('Window'):
        if len(group) < min_samples:
            continue
            
        row_dict = {
            'Window': int(window_idx),
            'Time_Start': float(group['Time (s)'].min()),
            'Time_End': float(group['Time (s)'].max()),
            'Sample_Count': int(len(group))
        }
        
        for col in channel_cols:
            sig = group[col].values
            feat = calculate_window_features(sig, sampling_rate_hz=sampling_rate_hz)
            
            # Core features (used for 24-feature ML model compatibility)
            row_dict[f'{col}_rms'] = feat['rms']
            row_dict[f'{col}_peak'] = feat['peak']
            row_dict[f'{col}_var'] = feat['var']
            
            # Extended physical features
            row_dict[f'{col}_std'] = feat['std']
            row_dict[f'{col}_crest'] = feat['crest_factor']
            row_dict[f'{col}_freq'] = feat['dom_freq']
            
        records.append(row_dict)
        # Dynamic passage occurs between window 27 and 37
        is_dynamic_anomaly = 1 if 27 <= window_idx <= 37 else 0
        labels.append(is_dynamic_anomaly)
        windows.append(int(window_idx))
        
    features_df = pd.DataFrame(records)
    return features_df, np.array(labels), np.array(windows)

def compute_healthy_baseline(features_df, baseline_windows_mask, feature_cols):
    """
    Computes healthy reference baseline mean and standard deviation from normal ambient windows.
    """
    ambient_df = features_df.loc[baseline_windows_mask, feature_cols]
    mean_series = ambient_df.mean()
    std_series = ambient_df.std().replace(0, 1e-6)
    
    return mean_series, std_series

def normalize_features(features_df, feature_cols, baseline_mean, baseline_std):
    """
    Computes standardized health-relative features:
    Z = (X - mean_baseline) / std_baseline
    """
    norm_df = (features_df[feature_cols] - baseline_mean) / baseline_std
    return norm_df
