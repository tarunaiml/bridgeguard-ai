"use client";

import { useSimulation } from '@/context/SimulationContext';
import { ConditionClass } from '@/types/bridge';
import clsx from 'clsx';
import { RefreshCcw } from 'lucide-react';

const conditions: { label: string; value: ConditionClass; desc: string; color: string }[] = [
  { label: 'Normal / Healthy', value: 'HEALTHY', desc: 'Routine operational state', color: 'bg-green-500/20 text-green-400 border-green-500/50' },
  { label: 'Minor Damage', value: 'MINOR DAMAGE', desc: 'Slight vibration changes', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50' },
  { label: 'Moderate Damage', value: 'MODERATE DAMAGE', desc: 'Noticeable structural stress', color: 'bg-orange-500/20 text-orange-400 border-orange-500/50' },
  { label: 'Severe Damage', value: 'SEVERE DAMAGE', desc: 'Critical structural failure', color: 'bg-red-500/20 text-red-500 border-red-500/50' },
];

export function SimulationControls() {
  const { condition, setCondition, isRunning, setIsRunning } = useSimulation();

  return (
    <div className="bg-[#0B1120] border border-gray-800 rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-medium uppercase text-sm tracking-wider">Simulation Control</h3>
        <button 
          onClick={() => {
            setCondition('HEALTHY');
            setIsRunning(true);
          }}
          className="text-gray-400 hover:text-white p-1 rounded transition-colors"
          title="Reset Simulation"
        >
          <RefreshCcw className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-3">
        {conditions.map(c => (
          <button
            key={c.value}
            onClick={() => setCondition(c.value)}
            className={clsx(
              "w-full text-left p-3 rounded-lg border transition-all duration-200",
              condition === c.value 
                ? c.color 
                : "bg-gray-800/30 text-gray-400 border-gray-800 hover:border-gray-600 hover:bg-gray-800"
            )}
          >
            <div className="font-medium text-sm">{c.label}</div>
            <div className={clsx("text-xs mt-1", condition === c.value ? "opacity-80" : "text-gray-500")}>
              {c.desc}
            </div>
          </button>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-800">
        <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
          <span>Structural Stress</span>
          <span>{condition === 'HEALTHY' ? 'Low' : condition === 'MINOR DAMAGE' ? 'Elevated' : condition === 'MODERATE DAMAGE' ? 'High' : 'Critical'}</span>
        </div>
        <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
          <div 
            className={clsx(
              "h-full transition-all duration-1000",
              condition === 'HEALTHY' ? 'w-[15%] bg-green-500' : 
              condition === 'MINOR DAMAGE' ? 'w-[40%] bg-yellow-500' :
              condition === 'MODERATE DAMAGE' ? 'w-[70%] bg-orange-500' : 'w-[100%] bg-red-500'
            )}
          />
        </div>
      </div>
    </div>
  );
}
