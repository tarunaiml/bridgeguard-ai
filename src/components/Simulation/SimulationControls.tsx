"use client";

import { useSimulation } from '@/context/SimulationContext';
import { ConditionClass } from '@/types/bridge';
import clsx from 'clsx';
import { generateSimulatedData } from '@/lib/simulation';
import { calculateHealthScore } from '@/lib/healthScore';

const conditions: { label: string; value: ConditionClass; color: string }[] = [
  { label: 'HEALTHY', value: 'HEALTHY', color: 'hover:bg-[#f0fdf4] text-[#16A34A] border-[#bbf7d0]' },
  { label: 'MINOR DAMAGE', value: 'MINOR DAMAGE', color: 'hover:bg-[#fefce8] text-[#F59E0B] border-[#fef08a]' },
  { label: 'MODERATE DAMAGE', value: 'MODERATE DAMAGE', color: 'hover:bg-[#fff7ed] text-[#f97316] border-[#fed7aa]' },
  { label: 'SEVERE DAMAGE', value: 'SEVERE DAMAGE', color: 'hover:bg-[#fef2f2] text-[#DC2626] border-[#fecaca]' },
];

export function SimulationControls() {
  const { condition, setCondition, isRunning, setIsRunning, mode, setMode, updateManualData, calculateManualHealth, history, currentData } = useSimulation();

  const handleConditionSelect = (c: ConditionClass) => {
    setCondition(c);
    
    // Auto-populate values if in manual mode
    if (mode === 'MANUAL INPUT') {
      const sampleData = generateSimulatedData(c, currentData || undefined);
      updateManualData(sampleData);
      calculateManualHealth(sampleData);
    }
  };

  const handleReset = () => {
    setCondition('HEALTHY');
    setIsRunning(true);
    setMode('SIMULATION');
  };

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm">
      <div className="mb-6">
        <h3 className="text-[#111827] font-bold uppercase text-xs tracking-widest">Bridge Condition Simulator</h3>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {conditions.map(c => {
          const isActive = condition === c.value;
          return (
            <button
              key={c.value}
              onClick={() => handleConditionSelect(c.value)}
              className={clsx(
                "p-4 rounded-xl border text-center transition-colors font-bold text-xs tracking-widest uppercase",
                isActive 
                  ? "bg-[#F5F7FA] border-[#2563EB] text-[#2563EB] shadow-sm"
                  : "bg-white border-[#E2E8F0] text-[#64748B] hover:border-[#cbd5e1]"
              )}
            >
              {c.label}
            </button>
          )
        })}
      </div>

      <div className="flex justify-end pt-4 border-t border-[#E2E8F0]">
        <button 
          onClick={handleReset}
          className="px-6 py-2 rounded-lg font-bold text-xs tracking-widest uppercase bg-[#F5F7FA] text-[#64748B] border border-[#E2E8F0] hover:bg-[#e2e8f0] transition-colors"
        >
          RESET
        </button>
      </div>
    </div>
  );
}
