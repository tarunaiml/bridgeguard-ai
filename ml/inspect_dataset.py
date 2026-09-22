import pandas as pd
import os

file_path = "ml/data/Vibration data - Ponneri Bridge - Local Train 8 am/8 am local train.XLSX"

def inspect_dataset():
    if not os.path.exists(file_path):
        print("File not found.")
        return
        
    print(f"File: {os.path.basename(file_path)}")
    print(f"Size: {os.path.getsize(file_path) / (1024*1024):.2f} MB")
    
    try:
        # Read the first few rows just to get columns
        df_preview = pd.read_excel(file_path, nrows=5)
        print("\nColumns:")
        print(df_preview.columns.tolist())
        
        print("\nFirst few rows:")
        print(df_preview.head())
        
        # Now try to read all to get full shape (might take a moment)
        print("\nLoading full dataset to get shape...")
        df = pd.read_excel(file_path)
        print(f"Shape: {df.shape}")
        
        print("\nMissing values:")
        print(df.isnull().sum().to_dict())
        
        print("\nSummary statistics:")
        print(df.describe())
    except Exception as e:
        print(f"Error inspecting dataset: {e}")

if __name__ == "__main__":
    inspect_dataset()
