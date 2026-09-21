"use client";

import { useSimulation } from '@/context/SimulationContext';
import { Activity, AlertTriangle, Wind, Droplets } from 'lucide-react';

export function KPIs() {
  const { currentData, health } = useSimulation();

  if (!currentData || !health) return null;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-[#0B1120] border border-gray-800 rounded-xl p-5">
        <div className="flex justify-between items-start mb-2">
          <span className="text-gray-400 text-sm font-medium uppercase">Anomaly Prob</span>
          <AlertTriangle className={`w-5 h-5 ${health.anomalyProbability > 50 ? 'text-red-400' : 'text-cyan-400'}`} />
        </div>
        <div className="text-2xl font-bold text-white mb-1">{health.anomalyProbability}%</div>
        <div className="text-xs text-gray-500">Prototype ML Estimate</div>
      </div>

      <div className="bg-[#0B1120] border border-gray-800 rounded-xl p-5">
        <div className="flex justify-between items-start mb-2">
          <span className="text-gray-400 text-sm font-medium uppercase">Vibration RMS</span>
          <Activity className="w-5 h-5 text-cyan-400" />
        </div>
        <div className="text-2xl font-bold text-white mb-1">{currentData.rms.toFixed(2)} g</div>
        <div className="text-xs text-gray-500">Simulated Acceleration</div>
      </div>

      <div className="bg-[#0B1120] border border-gray-800 rounded-xl p-5">
        <div className="flex justify-between items-start mb-2">
          <span className="text-gray-400 text-sm font-medium uppercase">Max Tilt</span>
          <Wind className="w-5 h-5 text-cyan-400" />
        </div>
        <div className="text-2xl font-bold text-white mb-1">
          {Math.max(Math.abs(currentData.tiltX), Math.abs(currentData.tiltY)).toFixed(2)}°
        </div>
        <div className="text-xs text-gray-500">Simulated Orientation</div>
      </div>

      <div className="bg-[#0B1120] border border-gray-800 rounded-xl p-5">
        <div className="flex justify-between items-start mb-2">
          <span className="text-gray-400 text-sm font-medium uppercase">Environment</span>
          <Droplets className="w-5 h-5 text-cyan-400" />
        </div>
        <div className="text-2xl font-bold text-white mb-1">{currentData.temperature}°C</div>
        <div className="text-xs text-gray-500">{currentData.humidity}% Humidity</div>
      </div>
    </div>
  );
}
