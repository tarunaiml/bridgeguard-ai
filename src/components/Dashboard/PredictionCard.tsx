"use client";

import { useSimulation } from '@/context/SimulationContext';
import { BrainCircuit, CheckSquare } from 'lucide-react';
import clsx from 'clsx';

export function PredictionCard() {
  const { health } = useSimulation();

  if (!health) return null;

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'HEALTHY': return 'text-green-400';
      case 'MINOR DAMAGE': return 'text-amber-400';
      case 'MODERATE DAMAGE': return 'text-orange-400';
      case 'SEVERE DAMAGE': return 'text-red-500';
      default: return 'text-slate-400';
    }
  };

  return (
    <div className="bg-[#0D1422] border border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col h-full">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-white font-bold uppercase text-xs tracking-widest flex items-center mb-1">
            <BrainCircuit className="w-4 h-4 mr-2 text-cyan-400" />
            AI Condition Prediction
          </h3>
        </div>
        <span className="text-[9px] bg-slate-800 border border-slate-700 text-cyan-400 px-2 py-1 rounded tracking-widest uppercase font-bold">
          Prototype ML Engine
        </span>
      </div>

      <div className="mb-6 p-4 bg-slate-900/50 rounded-xl border border-slate-800">
        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Current Prediction</div>
        <div className={clsx("text-2xl font-black tracking-widest uppercase", getConditionColor(health.condition))}>
          {health.condition}
        </div>
        <div className="mt-2 text-xs font-bold text-slate-400 flex items-center tracking-wide">
          CONFIDENCE: <span className="text-white ml-2 bg-slate-800 px-2 py-0.5 rounded">~{Math.max(85, 100 - health.anomalyProbability/2).toFixed(1)}%</span>
        </div>
      </div>

      <div className="flex-1">
        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Features Analyzed</div>
        <div className="grid grid-cols-2 gap-3">
          {['RMS Acceleration', 'Peak Acceleration', 'Std Deviation', 'Dominant Frequency', 'Tilt (X/Y)', 'Temperature'].map(f => (
            <div key={f} className="flex items-center text-xs font-medium text-slate-300 bg-slate-800/30 p-2 rounded border border-slate-800/50">
              <CheckSquare className="w-3 h-3 text-cyan-500 mr-2 shrink-0" />
              {f}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-800">
        <div className="text-[10px] text-slate-500 tracking-wide font-medium">
          Note: Currently utilizing deterministic Prototype Prediction Engine.
          <br/>
          <span className="text-cyan-400/80">Planned model: Random Forest Classifier</span>
        </div>
      </div>
    </div>
  );
}
