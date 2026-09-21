import { ConditionClass, SensorData } from '../types/bridge';

const generateNoise = (magnitude: number) => (Math.random() - 0.5) * magnitude;

export const generateSimulatedData = (condition: ConditionClass, previousData?: SensorData): SensorData => {
  const now = new Date();
  const timestamp = now.toISOString().substring(11, 19); // HH:MM:SS

  let baseRms = 0.4;
  let baseTiltX = 0.2;
  let baseTiltY = 0.3;
  let baseTemp = 29.5;
  let noiseLevel = 0.05;

  switch (condition) {
    case 'HEALTHY':
      baseRms = 0.42;
      baseTiltX = 0.4;
      baseTiltY = 0.8;
      noiseLevel = 0.05;
      break;
    case 'MINOR DAMAGE':
      baseRms = 0.75;
      baseTiltX = 1.2;
      baseTiltY = 1.5;
      noiseLevel = 0.15;
      break;
    case 'MODERATE DAMAGE':
      baseRms = 1.4;
      baseTiltX = 2.8;
      baseTiltY = 3.5;
      noiseLevel = 0.3;
      break;
    case 'SEVERE DAMAGE':
      baseRms = 2.8;
      baseTiltX = 5.5;
      baseTiltY = 6.2;
      noiseLevel = 0.6;
      break;
  }

  const rms = Math.max(0, baseRms + generateNoise(noiseLevel));
  const tiltX = baseTiltX + generateNoise(noiseLevel * 0.5);
  const tiltY = baseTiltY + generateNoise(noiseLevel * 0.5);
  
  // Create correlated pseudo-acceleration data based on RMS
  const accelX = generateNoise(rms * 2);
  const accelY = generateNoise(rms * 2);
  const accelZ = 1.0 + generateNoise(rms * 0.5); // gravity + vibration

  return {
    timestamp,
    accelX: parseFloat(accelX.toFixed(3)),
    accelY: parseFloat(accelY.toFixed(3)),
    accelZ: parseFloat(accelZ.toFixed(3)),
    rms: parseFloat(rms.toFixed(3)),
    peakAccel: parseFloat((rms * 1.5 + Math.abs(generateNoise(0.2))).toFixed(3)),
    stdDev: parseFloat((rms * 0.7).toFixed(3)),
    dominantFreq: parseFloat((15 + generateNoise(condition === 'HEALTHY' ? 2 : 10)).toFixed(1)),
    tiltX: parseFloat(tiltX.toFixed(2)),
    tiltY: parseFloat(tiltY.toFixed(2)),
    temperature: parseFloat((baseTemp + generateNoise(1)).toFixed(1)),
    humidity: 61 + Math.round(generateNoise(4))
  };
};
