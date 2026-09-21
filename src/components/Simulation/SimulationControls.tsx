"use client";

import { useSimulation } from '@/context/SimulationContext';
import { ConditionClass } from '@/types/bridge';
import clsx from 'clsx';
import { Play, RotateCcw, AlertTriangle, CheckCircle2 } from 'lucide-react';

const conditions: { label: string; value: ConditionClass; desc: string; icon: any; color: string }[] = [
  { label: 'HEALTHY', value: 'HEALTHY', desc: 'Normal baseline', icon: CheckCircle2, color: 'hover:bg-green-500/20 hover:border-green-500/50 text-green-500 bg-green-500/10 border-green-500/30' },
  { label: 'MINOR DAMAGE', value: 'MINOR DAMAGE', desc: 'Slight change', icon: AlertTriangle, color: 'hover:bg-amber-500/20 hover:border-amber-500/50 text-amber-500 bg-amber-500/10 border-amber-500/30' },
  { label: 'MODERATE', value: 'MODERATE DAMAGE', desc: 'Noticeable stress', icon: AlertTriangle, color: 'hover:bg-orange-500/20 hover:border-orange-500/50 text-orange-500 bg-orange-500/10 border-orange-500/30' },
  { label: 'SEVERE', value: 'SEVERE DAMAGE', desc: 'Major anomaly', icon: AlertTriangle, color: 'hover:bg-red-500/20 hover:border-red-500/50 text-red-500 bg-red-500/10 border-red-500/30' },
];

export function SimulationControls() {
  const { condition, setCondition, isRunning, setIsRunning } = useSimulation();

  const stressLevel = condition === 'HEALTHY' ? 10 : condition === 'MINOR DAMAGE' ? 35 : condition === 'MODERATE DAMAGE' ? 65 : 95;

  return (
    <div className="bg-[#0D1422] border border-slate-800 rounded-2xl p-6 shadow-sm">
      <div className="mb-6">
        <h3 className="text-white font-bold uppercase text-xs tracking-widest flex items-center">
          <Play className="w-4 h-4 mr-2 text-cyan-400" /> Live Bridge Simulator
        </h3>
        <p className="text-[11px] text-slate-500 uppercase tracking-wide mt-2">
          Change the simulated structural condition and observe how the monitoring system responds.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {conditions.map(c => {
          const Icon = c.icon;
          const isActive = condition === c.value;
          return (
            <button
              key={c.value}
              onClick={() => setCondition(c.value)}
              className={clsx(
                "p-4 rounded-xl border text-left transition-all duration-200",
                isActive 
                  ? c.color.split(' ').slice(2).join(' ') + " ring-2 ring-offset-2 ring-offset-[#0D1422] " + c.color.split(' ')[2].replace('text-', 'ring-')
                  : "bg-slate-900/50 border-slate-800 text-slate-400 hover:bg-slate-800"
              )}
            >
              <div className="flex items-center space-x-2 mb-2">
                <Icon className={clsx("w-4 h-4", isActive ? "" : "text-slate-500")} />
                <div className="font-bold text-xs tracking-wider uppercase">{c.label}</div>
              </div>
              <div className={clsx("text-[10px] tracking-wide", isActive ? "opacity-80" : "text-slate-500")}>
                {c.desc}
              </div>
            </button>
          )
        })}
      </div>

      <div className="mb-8">
        <div className="flex justify-between text-[10px] font-bold tracking-widest text-slate-400 mb-2 uppercase">
          <span>Structural Stress</span>
          <span className="text-cyan-400">Current Stress: {stressLevel}%</span>
        </div>
        <div className="relative h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
          <div 
            className="absolute top-0 left-0 h-full transition-all duration-1000 ease-out"
            style={{ 
              width: `${stressLevel}%`,
              backgroundColor: stressLevel < 25 ? '#22c55e' : stressLevel < 50 ? '#f59e0b' : stressLevel < 75 ? '#f97316' : '#ef4444'
            }}
          />
        </div>
        <div className="flex justify-between text-[10px] text-slate-600 mt-2 font-mono">
          <span>0</span>
          <span>100</span>
        </div>
      </div>

      <div className="flex space-x-4">
        <button 
          onClick={() => setIsRunning(!isRunning)}
          className={clsx(
            "flex-1 flex items-center justify-center py-3 rounded-xl font-bold text-xs tracking-widest uppercase transition-colors",
            isRunning 
              ? "bg-amber-500/10 text-amber-500 border border-amber-500/20 hover:bg-amber-500/20" 
              : "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 hover:bg-cyan-500/20"
          )}
        >
          {isRunning ? 'PAUSE SIMULATION' : '▶ RUN SIMULATION'}
        </button>
        <button 
          onClick={() => {
            setCondition('HEALTHY');
            setIsRunning(true);
          }}
          className="px-6 flex items-center justify-center py-3 rounded-xl font-bold text-xs tracking-widest uppercase bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors"
        >
          <RotateCcw className="w-4 h-4 mr-2" /> Reset
        </button>
      </div>
    </div>
  );
}
