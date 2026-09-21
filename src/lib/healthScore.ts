import { BridgeHealth, ConditionClass, SensorData } from '../types/bridge';

export const calculateHealthScore = (data: SensorData): BridgeHealth => {
  // This prototype scoring layer is temporary and will be replaced/validated 
  // with the trained Random Forest model after hardware data collection.
  // Prototype weighting: Vibration 40%, Tilt 25%, Frequency 20%, Environment 15%

  // 1. Vibration Score (0-100)
  // Higher RMS/Peak means lower score
  const vibrationFactor = Math.min(100, (data.rms * 50) + (data.peakAccel * 20));
  let vibrationScore = 100 - vibrationFactor;
  vibrationScore = Math.max(0, Math.min(100, vibrationScore));

  // 2. Tilt Score (0-100)
  const maxTilt = Math.max(Math.abs(data.tiltX), Math.abs(data.tiltY));
  const tiltFactor = Math.min(100, maxTilt * 25);
  let tiltScore = 100 - tiltFactor;
  tiltScore = Math.max(0, Math.min(100, tiltScore));

  // 3. Frequency Score (0-100)
  // Assume healthy dominant frequency is around 15 Hz
  const freqDeviation = Math.abs(15 - data.dominantFreq);
  const freqFactor = Math.min(100, freqDeviation * 10);
  let freqScore = 100 - freqFactor;
  freqScore = Math.max(0, Math.min(100, freqScore));

  // 4. Environment Score (0-100)
  // Assume healthy temp is 25C, healthy humidity is 60%
  const tempDeviation = Math.abs(25 - data.temperature);
  const humDeviation = Math.abs(60 - data.humidity);
  const envFactor = Math.min(100, (tempDeviation * 2) + (humDeviation * 0.5));
  let envScore = 100 - envFactor;
  envScore = Math.max(0, Math.min(100, envScore));

  const finalScore = Math.round(
    vibrationScore * 0.40 +
    tiltScore * 0.25 +
    freqScore * 0.20 +
    envScore * 0.15
  );

  const clampedScore = Math.max(0, Math.min(100, finalScore));

  // We still calculate anomaly probability for UI display
  const anomalyFactor = ((data.stdDev * 1.5 + data.peakAccel) / 5.0) + (data.stress / 200);
  let anomalyProbability = Math.round(Math.max(5, Math.min(95, anomalyFactor * 100)));

  let condition: ConditionClass = 'HEALTHY';
  let recommendation = 'Prototype Recommendation: Continue routine monitoring. No immediate inspection indicated by the prototype.';

  if (clampedScore <= 30) {
    condition = 'SEVERE DAMAGE';
    recommendation = 'Prototype Recommendation: Immediate prototype inspection recommended. Investigate abnormal vibration and support conditions.';
  } else if (clampedScore <= 50) {
    condition = 'MODERATE DAMAGE';
    recommendation = 'Prototype Recommendation: Inspection recommended. Review vibration and tilt trends.';
  } else if (clampedScore <= 75) {
    condition = 'MINOR DAMAGE';
    recommendation = 'Prototype Recommendation: Monitor vibration trend and inspect connection/joint conditions.';
  } else {
    recommendation = 'Prototype Recommendation: Continue routine monitoring. No immediate inspection indicated by the prototype.';
  }

  // Ensure anomaly aligns with condition conceptually
  if (condition === 'SEVERE DAMAGE') anomalyProbability = Math.max(70, anomalyProbability);
  if (condition === 'HEALTHY') anomalyProbability = Math.min(25, anomalyProbability);

  return {
    score: clampedScore,
    condition,
    anomalyProbability: Math.round(anomalyProbability),
    recommendation,
    breakdown: {
      vibrationScore: Math.round(vibrationScore),
      tiltScore: Math.round(tiltScore),
      freqScore: Math.round(freqScore),
      envScore: Math.round(envScore)
    }
  };
};
