"use client";

import { useSimulation } from '@/context/SimulationContext';
import clsx from 'clsx';

export function HealthScore() {
  const { health } = useSimulation();

  if (!health) return <div className="h-full min-h-[250px] animate-pulse rounded-2xl border border-slate-200 bg-white"></div>;

  const getScoreColor = (score: number) => {
    if (score > 75) return 'text-emerald-600 stroke-emerald-500';
    if (score > 50) return 'text-amber-600 stroke-amber-500';
    if (score > 30) return 'text-orange-600 stroke-orange-500';
    return 'text-red-600 stroke-red-500';
  };

  const circumference = 2 * Math.PI * 60;
  const strokeDashoffset = circumference - (health.score / 100) * circumference;
  const colorClass = getScoreColor(health.score);

  return (
    <div className="relative flex h-full min-h-[250px] flex-col items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="absolute right-4 top-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
        Prototype score
      </div>
      
      <div className="relative w-40 h-40 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="80"
            cy="80"
            r="60"
            className="stroke-slate-100"
            strokeWidth="12"
            fill="transparent"
          />
          <circle
            cx="80"
            cy="80"
            r="60"
            className={clsx("transition-all duration-1000 ease-in-out", colorClass.split(' ')[1])}
            strokeWidth="12"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className={clsx("text-4xl font-bold", colorClass.split(' ')[0])}>
            {health.score}
          </span>
          <span className="text-xs font-medium uppercase tracking-wider text-slate-400">/ 100</span>
        </div>
      </div>
      
      <div className="mt-4 text-center">
        <div className={clsx("text-lg font-bold tracking-widest", colorClass.split(' ')[0])}>
          {health.condition}
        </div>
        <p className="mt-1 max-w-[200px] text-xs leading-tight text-slate-500">
          Derived from the active simulation or manual reading.
        </p>
      </div>
    </div>
  );
}
