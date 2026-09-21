export type ConditionClass = 'HEALTHY' | 'MINOR DAMAGE' | 'MODERATE DAMAGE' | 'SEVERE DAMAGE';

export interface SensorData {
  timestamp: string;
  accelX: number;
  accelY: number;
  accelZ: number;
  rms: number;
  peakAccel: number;
  stdDev: number;
  dominantFreq: number;
  tiltX: number;
  tiltY: number;
  temperature: number;
  humidity: number;
  stress: number;
  score?: number;
}

export interface BridgeHealth {
  score: number; // 0-100
  condition: ConditionClass;
  anomalyProbability: number;
  recommendation: string;
  breakdown?: {
    vibrationScore: number;
    tiltScore: number;
    freqScore: number;
    envScore: number;
  };
}

export interface FeatureImportance {
  feature: string;
  importance: number; // 0-100
}

export interface HistoricalHealth {
  day: string;
  score: number;
}
