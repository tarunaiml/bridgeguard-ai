import urllib.request
import json

payload = {
    "features": {
      "A1_Acc_1_Y_rms": 0.5, "A1_Acc_1_Y_peak": 1.0, "A1_Acc_1_Y_var": 0.25,
      "A2_Acc_1_x_rms": 0.5, "A2_Acc_1_x_peak": 1.0, "A2_Acc_1_x_var": 0.25,
      "A3_Acc_1_Z_rms": 0.5, "A3_Acc_1_Z_peak": 1.0, "A3_Acc_1_Z_var": 0.25,
      "A4_Acc2_Y_rms": 0.5, "A4_Acc2_Y_peak": 1.0, "A4_Acc2_Y_var": 0.25,
      "B1_Acc_2_X_rms": 0.5, "B1_Acc_2_X_peak": 1.0, "B1_Acc_2_X_var": 0.25,
      "B2_Acc_2_Z_rms": 0.5, "B2_Acc_2_Z_peak": 1.0, "B2_Acc_2_Z_var": 0.25,
      "B3_Acc_3_Y_rms": 0.5, "B3_Acc_3_Y_peak": 1.0, "B3_Acc_3_Y_var": 0.25,
      "B4_Acc3_X_rms": 0.5, "B4_Acc3_X_peak": 1.0, "B4_Acc3_X_var": 0.25
    }
}

req = urllib.request.Request(
    'http://127.0.0.1:5000/api/explain', 
    data=json.dumps(payload).encode('utf-8'),
    headers={'Content-Type': 'application/json'}
)

try:
    res = urllib.request.urlopen(req)
    print(json.dumps(json.loads(res.read()), indent=2))
except Exception as e:
    print(f"Error: {e}")
