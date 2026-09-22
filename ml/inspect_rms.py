import pandas as pd
import numpy as np

file_path = "ml/data/Vibration data - Ponneri Bridge - Local Train 8 am/8 am local train.XLSX"

df = pd.read_excel(file_path)
df.columns = [c.strip() for c in df.columns]
df = df.dropna()

df['Window'] = (df['Time (s)'] // 1).astype(int)
df_features = df.drop(columns=['Time (s)'])
rms_df = df_features.groupby('Window').apply(lambda x: np.sqrt((x**2).mean()))

print(rms_df)
