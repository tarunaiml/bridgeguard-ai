import { BridgeHealth, ConditionClass, SensorData } from '../types/bridge';

export const calculateHealthScore = (data: SensorData): BridgeHealth => {
  // This prototype scoring layer is temporary and will be replaced/validated 
  // with the trained Random Forest model after hardware data collection.

  // 1. Vibration condition (40%)
  // Healthy RMS is around 0.4. Severe is > 2.5
  let vibrationScore = 100 - ((data.rms - 0.3) / 2.5) * 100;
  vibrationScore = Math.max(0, Math.min(100, vibrationScore));

  // 2. Tilt condition (25%)
  // Healthy tilt is < 1.0. Severe > 5.0
  const maxTilt = Math.max(Math.abs(data.tiltX), Math.abs(data.tiltY));
  let tiltScore = 100 - (maxTilt / 6.0) * 100;
  tiltScore = Math.max(0, Math.min(100, tiltScore));

  // 3. Environmental condition (15%)
  // Assume 25-35C is optimal.
  const tempDeviation = Math.abs(data.temperature - 30);
  let envScore = 100 - (tempDeviation / 15) * 100;
  envScore = Math.max(0, Math.min(100, envScore));

  // 4. Anomaly condition (20%)
  // Simple heuristic based on stdDev, peakAccel, and stress
  const anomalyFactor = ((data.stdDev * 1.5 + data.peakAccel) / 5.0) + (data.stress / 200);
  let anomalyProbability = Math.max(5, Math.min(95, anomalyFactor * 100));
  let anomalyScore = 100 - anomalyProbability;

  const finalScore = Math.round(
    vibrationScore * 0.40 +
    tiltScore * 0.25 +
    envScore * 0.15 +
    anomalyScore * 0.20
  );

  const clampedScore = Math.max(0, Math.min(100, finalScore));

  let condition: ConditionClass = 'HEALTHY';
  let recommendation = 'Continue routine monitoring. No immediate inspection indicated by the prototype.';

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
  };
};
