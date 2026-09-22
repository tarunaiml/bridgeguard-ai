import urllib.request
import json
import os

def download_mendeley():
    # The mendeley data page has a standard API
    url = "https://data.mendeley.com/api/datasets/hh52mhtndg/2"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    
    try:
        res = urllib.request.urlopen(req)
        data = json.loads(res.read())
        
        os.makedirs('ml/data', exist_ok=True)
        
        for file_info in data['files']:
            print(f"File: {file_info['filename']} Size: {file_info['size']}")
            dl_url = file_info['contentUrl']
            filename = file_info['filename']
            out_path = os.path.join('ml/data', filename)
            
            print(f"Downloading {filename}...")
            urllib.request.urlretrieve(dl_url, out_path)
            print(f"Saved {filename}")
            
    except Exception as e:
        print("Failed to download using API. Error:", e)

if __name__ == "__main__":
    download_mendeley()
