"use client";

import { useSimulation } from '@/context/SimulationContext';
import clsx from 'clsx';

export function PredictionCard() {
  const { health } = useSimulation();

  if (!health) return null;

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'HEALTHY': return 'text-[#16A34A]';
      case 'MINOR DAMAGE': return 'text-[#F59E0B]';
      case 'MODERATE DAMAGE': return 'text-[#f97316]';
      case 'SEVERE DAMAGE': return 'text-[#DC2626]';
      default: return 'text-[#64748B]';
    }
  };

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm flex flex-col h-full">
      <div className="mb-6">
        <h3 className="text-[#111827] font-bold uppercase text-xs tracking-widest">
          AI Condition Prediction
        </h3>
      </div>

      <div className="mb-6">
        <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest mb-1">Prediction</div>
        <div className={clsx("text-2xl font-black tracking-widest uppercase mb-1", getConditionColor(health.condition))}>
          {health.condition}
        </div>
        <div className="text-xs font-bold text-[#64748B] tracking-wide">
          Confidence: <span className="text-[#111827]">{Math.max(85, 100 - health.anomalyProbability/2).toFixed(1)}%</span>
        </div>
      </div>

      <div className="mb-6">
        <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest mb-3">Features Analyzed</div>
        <ul className="text-xs font-medium text-[#111827] space-y-2">
          <li>✓ RMS Acceleration</li>
          <li>✓ Peak Acceleration</li>
          <li>✓ Standard Deviation</li>
          <li>✓ Dominant Frequency</li>
          <li>✓ Tilt</li>
          <li>✓ Temperature</li>
        </ul>
      </div>

      <div className="mt-auto pt-4 border-t border-[#E2E8F0] bg-[#F5F7FA] p-3 rounded-lg">
        <div className="mb-2">
          <span className="text-[9px] font-bold text-[#64748B] uppercase tracking-widest block mb-1">Current Engine:</span>
          <span className="text-xs font-bold text-[#111827]">Prototype Prediction Engine</span>
        </div>
        <div>
          <span className="text-[9px] font-bold text-[#64748B] uppercase tracking-widest block mb-1">Planned Model:</span>
          <span className="text-xs font-bold text-[#2563EB]">Random Forest Classifier</span>
        </div>
      </div>
    </div>
  );
}
