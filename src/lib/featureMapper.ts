export function buildPonneriFeatureVector(currentData: any, baseline: any = {}, expectedFeatures: string[] = []) {
  if (!currentData) return {};
  
  // Safe defaults if currentData properties are missing
  const rms = currentData.rms_vibration || 0;
  const tilt = currentData.tilt || 0;
  const peak = currentData.peak_acceleration || (rms * 1.5);
  
  let payloadFeatures: Record<string, number> = {
    "A1_Acc_1_Y_rms": rms / 1000,
    "A1_Acc_1_Y_peak": peak / 1000,
    "A1_Acc_1_Y_var": Math.pow(rms / 1000, 2),
    "A2_Acc_1_x_rms": tilt / 1000,
    "A2_Acc_1_x_peak": (tilt * 1.5) / 1000,
    "A2_Acc_1_x_var": Math.pow(tilt / 1000, 2),
    "A3_Acc_1_Z_rms": rms / 2000,
    "A3_Acc_1_Z_peak": (peak) / 2000,
    "A3_Acc_1_Z_var": Math.pow(rms / 2000, 2)
  };
  
  // Fill missing expected features with baseline mean (0 if not available)
  if (expectedFeatures && expectedFeatures.length > 0) {
    expectedFeatures.forEach((f: string) => {
      if (!(f in payloadFeatures)) {
         payloadFeatures[f] = baseline?.mean?.[f] || 0;
      }
    });
  }
  
  return payloadFeatures;
}
