"use client";

import { useSimulation } from '@/context/SimulationContext';
import clsx from 'clsx';

export function AnomalyMonitor() {
  const { health } = useSimulation();

  if (!health) return null;

  const isLow = health.anomalyProbability < 30;
  const isMod = health.anomalyProbability >= 30 && health.anomalyProbability < 60;
  
  const statusColor = isLow ? 'text-[#16A34A]' : isMod ? 'text-[#F59E0B]' : 'text-[#DC2626]';
  const statusText = isLow ? 'LOW' : isMod ? 'MEDIUM' : health.anomalyProbability < 80 ? 'HIGH' : 'CRITICAL';
  const bgColor = isLow ? '#16A34A' : isMod ? '#F59E0B' : '#DC2626';

  return (
    <div className="flex flex-col space-y-6 h-full">
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm">
        <h3 className="text-[#111827] font-bold uppercase text-xs tracking-widest mb-6 flex justify-between items-center">
          <span>Prototype Anomaly Indicator</span>
          <span className="text-[9px] bg-[#F5F7FA] text-[#64748B] px-2 py-1 rounded border border-[#E2E8F0]">SIMULATION MODE</span>
        </h3>
        
        <div className="flex justify-between items-end mb-2">
          <div className="text-3xl font-black text-[#111827]">{health.anomalyProbability}</div>
          <div className={clsx("text-sm font-bold uppercase tracking-widest", statusColor)}>{statusText}</div>
        </div>

        <div className="relative h-2 bg-[#F5F7FA] rounded-full overflow-hidden border border-[#E2E8F0]">
          <div 
            className="absolute top-0 left-0 h-full transition-all duration-1000 ease-out"
            style={{ width: `${health.anomalyProbability}%`, backgroundColor: bgColor }}
          />
        </div>
      </div>

      <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm flex-1">
        <h3 className="text-[#111827] font-bold uppercase text-xs tracking-widest mb-3">
          Prototype Recommendation
        </h3>
        <p className="text-sm text-[#64748B] leading-relaxed font-medium">
          {health.recommendation.replace('Prototype Recommendation: ', '')}
        </p>
      </div>
    </div>
  );
}
