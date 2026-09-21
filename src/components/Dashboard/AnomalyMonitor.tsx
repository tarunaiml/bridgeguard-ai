"use client";

import { useSimulation } from '@/context/SimulationContext';
import clsx from 'clsx';
import { ShieldAlert, Info } from 'lucide-react';

export function AnomalyMonitor() {
  const { health } = useSimulation();

  if (!health) return null;

  const isLow = health.anomalyProbability < 30;
  const isMod = health.anomalyProbability >= 30 && health.anomalyProbability < 60;
  
  const statusColor = isLow ? 'text-green-400' : isMod ? 'text-amber-400' : 'text-red-500';
  const statusText = isLow ? 'LOW' : isMod ? 'MODERATE' : 'HIGH';
  const bgColor = isLow ? '#4ade80' : isMod ? '#fbbf24' : '#ef4444';

  return (
    <div className="flex flex-col space-y-6 h-full">
      <div className="bg-[#0D1422] border border-slate-800 rounded-2xl p-6 shadow-sm flex-1">
        <h3 className="text-white font-bold uppercase text-xs tracking-widest flex items-center mb-6">
          <ShieldAlert className="w-4 h-4 mr-2 text-cyan-400" />
          Anomaly Monitor
        </h3>
        
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div>
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Status</div>
            <div className={clsx("text-lg font-black tracking-widest uppercase", statusColor)}>{statusText}</div>
          </div>
          <div>
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Probability</div>
            <div className="text-lg font-black tracking-widest text-white">{health.anomalyProbability}%</div>
          </div>
          <div>
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Deviation</div>
            <div className="text-lg font-black tracking-widest text-slate-300 uppercase">{statusText}</div>
          </div>
        </div>

        <div className="relative h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
          <div 
            className="absolute top-0 left-0 h-full transition-all duration-1000 ease-out"
            style={{ width: `${health.anomalyProbability}%`, backgroundColor: bgColor }}
          />
        </div>
      </div>

      <div className={clsx(
        "border rounded-2xl p-6 shadow-sm",
        isLow ? "bg-green-500/5 border-green-500/20" : 
        isMod ? "bg-amber-500/5 border-amber-500/20" : 
        "bg-red-500/5 border-red-500/20"
      )}>
        <h3 className={clsx("font-bold uppercase text-xs tracking-widest flex items-center mb-3", statusColor)}>
          <Info className="w-4 h-4 mr-2" />
          Prototype Recommendation
        </h3>
        <p className="text-sm text-slate-300 leading-relaxed font-medium">
          {health.recommendation.replace('Prototype Recommendation: ', '')}
        </p>
      </div>
    </div>
  );
}
