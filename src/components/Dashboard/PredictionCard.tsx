"use client";

import { useSimulation } from '@/context/SimulationContext';
import { BrainCircuit, CheckCircle2 } from 'lucide-react';
import clsx from 'clsx';

export function PredictionCard() {
  const { health } = useSimulation();

  if (!health) return null;

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'HEALTHY': return 'text-green-400';
      case 'MINOR DAMAGE': return 'text-yellow-400';
      case 'MODERATE DAMAGE': return 'text-orange-400';
      case 'SEVERE DAMAGE': return 'text-red-500';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="bg-[#0B1120] border border-gray-800 rounded-xl p-5 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-medium uppercase text-sm tracking-wider flex items-center">
          <BrainCircuit className="w-4 h-4 mr-2 text-cyan-400" />
          AI Condition Prediction
        </h3>
        <span className="text-xs bg-gray-800 text-gray-400 px-2 py-1 rounded">Prototype Engine</span>
      </div>

      <div className="mb-6">
        <div className="text-sm text-gray-500 mb-1">Current Classification</div>
        <div className={clsx("text-2xl font-bold", getConditionColor(health.condition))}>
          {health.condition}
        </div>
        <div className="mt-2 text-sm text-gray-400 flex items-center">
          Confidence Estimate: <span className="text-white font-medium ml-1">~{Math.max(85, 100 - health.anomalyProbability/2).toFixed(1)}%</span>
        </div>
      </div>

      <div className="flex-1">
        <div className="text-xs text-gray-500 uppercase tracking-wider mb-3">Features Analyzed</div>
        <div className="grid grid-cols-2 gap-2">
          {['RMS Acceleration', 'Peak Acceleration', 'Std Deviation', 'Dominant Frequency', 'Tilt X/Y', 'Temperature'].map(f => (
            <div key={f} className="flex items-center text-sm text-gray-300">
              <CheckCircle2 className="w-3 h-3 text-cyan-500 mr-2" />
              {f}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-800">
        <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Recommendation</div>
        <p className="text-sm text-gray-300 italic border-l-2 border-cyan-800 pl-3 py-1">
          {health.recommendation}
        </p>
      </div>
    </div>
  );
}
