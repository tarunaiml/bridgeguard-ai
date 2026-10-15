"use client";

import { useSimulation } from '@/context/SimulationContext';
import { ConditionClass } from '@/types/bridge';
import clsx from 'clsx';
import { generateSimulatedData } from '@/lib/simulation';

const conditions: { label: string; value: ConditionClass; color: string }[] = [
  { label: 'HEALTHY', value: 'HEALTHY', color: 'hover:bg-[#f0fdf4] text-[#16A34A] border-[#bbf7d0]' },
  { label: 'MINOR DAMAGE', value: 'MINOR DAMAGE', color: 'hover:bg-[#fefce8] text-[#F59E0B] border-[#fef08a]' },
  { label: 'MODERATE DAMAGE', value: 'MODERATE DAMAGE', color: 'hover:bg-[#fff7ed] text-[#f97316] border-[#fed7aa]' },
  { label: 'SEVERE DAMAGE', value: 'SEVERE DAMAGE', color: 'hover:bg-[#fef2f2] text-[#DC2626] border-[#fecaca]' },
];

export function SimulationControls() {
  const { condition, setCondition, setIsRunning, mode, setMode, updateManualData, calculateManualHealth, currentData } = useSimulation();

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
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-slate-950">Condition simulator</h3>
        <p className="mt-1 text-xs leading-5 text-slate-500">Changes are applied to the prototype data generator. They are not real structural events.</p>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 mb-6">
        {conditions.map(c => {
          const isActive = condition === c.value;
          return (
            <button
              key={c.value}
              onClick={() => handleConditionSelect(c.value)}
              className={clsx(
                "min-h-20 rounded-xl border px-3 py-3 text-center text-[11px] font-semibold tracking-wide transition-colors",
                isActive 
                  ? "bg-[#F5F7FA] border-[#2563EB] text-[#2563EB] shadow-sm"
                  : "bg-white border-[#E2E8F0] text-[#64748B] hover:border-blue-200 hover:text-blue-700"
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
          className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-blue-300 hover:text-blue-700"
        >
          Reset condition
        </button>
      </div>
    </div>
  );
}
