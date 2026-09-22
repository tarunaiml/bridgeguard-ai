import zipfile
import os
import pandas as pd
import glob
import scipy.io as sio

def inspect_dataset():
    zip_path = "ml/data/DiB.zip"
    extract_path = "ml/data/extracted"
    
    print("1. Extracting dataset...")
    if not os.path.exists(extract_path):
        os.makedirs(extract_path, exist_ok=True)
        with zipfile.ZipFile(zip_path, 'r') as zip_ref:
            zip_ref.extractall(extract_path)
    
    print("2. Inspecting structure...")
    all_files = glob.glob(f"{extract_path}/**/*.*", recursive=True)
    extensions = {}
    for f in all_files:
        ext = os.path.splitext(f)[1]
        extensions[ext] = extensions.get(ext, 0) + 1
        
    print(f"Files found: {len(all_files)}")
    print(f"Extensions: {extensions}")
    
    # Let's peek at a parquet or csv if available
    for f in all_files[:20]:
        print(f" - {os.path.basename(f)}")
        
if __name__ == "__main__":
    inspect_dataset()
