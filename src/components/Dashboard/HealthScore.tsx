"use client";

import { useSimulation } from '@/context/SimulationContext';
import clsx from 'clsx';

export function HealthScore() {
  const { health } = useSimulation();

  if (!health) return <div className="h-48 animate-pulse bg-gray-800 rounded-xl"></div>;

  const getScoreColor = (score: number) => {
    if (score > 75) return 'text-green-400 stroke-green-400';
    if (score > 50) return 'text-yellow-400 stroke-yellow-400';
    if (score > 30) return 'text-orange-400 stroke-orange-400';
    return 'text-red-500 stroke-red-500';
  };

  const circumference = 2 * Math.PI * 60;
  const strokeDashoffset = circumference - (health.score / 100) * circumference;
  const colorClass = getScoreColor(health.score);

  return (
    <div className="bg-[#0B1120] border border-gray-800 rounded-xl p-6 flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute top-4 right-4 text-xs text-gray-500 uppercase tracking-wider font-semibold">
        Prototype Score
      </div>
      
      <div className="relative w-40 h-40 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="80"
            cy="80"
            r="60"
            className="stroke-gray-800"
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
          <span className="text-gray-400 text-xs font-medium uppercase tracking-wider">/ 100</span>
        </div>
      </div>
      
      <div className="mt-4 text-center">
        <div className={clsx("text-lg font-bold tracking-widest", colorClass.split(' ')[0])}>
          {health.condition}
        </div>
        <p className="text-xs text-gray-500 mt-1 max-w-[200px] leading-tight">
          Based on simulated MPU6050 and DHT11 data streams.
        </p>
      </div>
    </div>
  );
}
