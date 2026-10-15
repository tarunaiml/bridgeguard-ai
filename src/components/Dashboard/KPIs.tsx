"use client";

import { useSimulation } from '@/context/SimulationContext';
import { Activity, AlertTriangle, Wind, Droplets } from 'lucide-react';

export function KPIs() {
  const { currentData, health } = useSimulation();

  if (!currentData || !health) return null;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex justify-between items-start mb-2">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Prototype risk</span>
          <AlertTriangle className={`w-5 h-5 ${health.anomalyProbability > 50 ? 'text-red-500' : 'text-blue-600'}`} />
        </div>
        <div className="mb-1 text-2xl font-semibold text-slate-950">{health.anomalyProbability}%</div>
        <div className="text-xs text-slate-500">Heuristic score</div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex justify-between items-start mb-2">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Vibration RMS</span>
          <Activity className="w-5 h-5 text-blue-600" />
        </div>
        <div className="mb-1 text-2xl font-semibold text-slate-950">{currentData.rms.toFixed(2)} g</div>
        <div className="text-xs text-slate-500">Current reading</div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex justify-between items-start mb-2">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Maximum tilt</span>
          <Wind className="w-5 h-5 text-blue-600" />
        </div>
        <div className="mb-1 text-2xl font-semibold text-slate-950">
          {Math.max(Math.abs(currentData.tiltX), Math.abs(currentData.tiltY)).toFixed(2)}°
        </div>
        <div className="text-xs text-slate-500">Current orientation</div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex justify-between items-start mb-2">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Environment</span>
          <Droplets className="w-5 h-5 text-blue-600" />
        </div>
        <div className="mb-1 text-2xl font-semibold text-slate-950">{currentData.temperature}°C</div>
        <div className="text-xs text-slate-500">{currentData.humidity}% humidity</div>
      </div>
    </div>
  );
}
