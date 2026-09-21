"use client";

import { useSimulation } from '@/context/SimulationContext';
import { Activity, AlertTriangle, Wind, Droplets } from 'lucide-react';
import clsx from 'clsx';

export function HeroStatus() {
  const { currentData, health } = useSimulation();

  if (!currentData || !health) return <div className="h-64 bg-[#0D1422] animate-pulse rounded-xl"></div>;

  const getStatusColor = (score: number) => {
    if (score > 75) return 'text-green-500 stroke-green-500 bg-green-500/10 border-green-500/20';
    if (score > 50) return 'text-amber-500 stroke-amber-500 bg-amber-500/10 border-amber-500/20';
    if (score > 30) return 'text-orange-500 stroke-orange-500 bg-orange-500/10 border-orange-500/20';
    return 'text-red-500 stroke-red-500 bg-red-500/10 border-red-500/20';
  };

  const getStatusText = (score: number) => {
    if (score > 75) return 'NORMAL';
    if (score > 50) return 'WARNING';
    if (score > 30) return 'ELEVATED';
    return 'CRITICAL';
  };

  const circumference = 2 * Math.PI * 65;
  const strokeDashoffset = circumference - (health.score / 100) * circumference;
  const colorClasses = getStatusColor(health.score);
  const colorBase = colorClasses.split(' ')[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
      
      {/* Main Health Gauge */}
      <div className="lg:col-span-4 bg-[#0D1422] border border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center relative overflow-hidden shadow-sm">
        <h2 className="absolute top-6 left-6 text-xs font-bold text-slate-400 tracking-widest uppercase">
          Bridge Health
        </h2>
        
        <div className="relative w-48 h-48 flex items-center justify-center mt-6">
          <svg className="w-full h-full transform -rotate-90">
            <circle cx="96" cy="96" r="65" className="stroke-slate-800" strokeWidth="12" fill="transparent" />
            <circle
              cx="96" cy="96" r="65"
              className={clsx("transition-all duration-1000 ease-out", colorClasses.split(' ')[1])}
              strokeWidth="12"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className={clsx("text-5xl font-black tracking-tighter", colorBase)}>
              {health.score}
            </span>
            <span className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">/ 100</span>
          </div>
        </div>
        
        <div className="mt-4 text-center">
          <div className={clsx("text-xl font-black tracking-widest uppercase", colorBase)}>
            {health.condition}
          </div>
          <p className="text-xs text-slate-500 mt-2 max-w-[220px] leading-relaxed">
            Based on simulated vibration, tilt and environmental indicators.
          </p>
        </div>
      </div>

      {/* Mini KPIs */}
      <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* VIBRATION */}
        <div className="bg-[#0D1422] border border-slate-800 rounded-2xl p-5 flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Vibration</span>
            <div className="p-2 bg-slate-800/50 rounded-lg">
              <Activity className="w-4 h-4 text-cyan-400" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-light text-white mb-1">
              {currentData.rms.toFixed(2)} <span className="text-sm text-slate-500 font-medium">g</span>
            </div>
            <div className="inline-flex items-center px-2 py-1 rounded bg-slate-800/50 border border-slate-700/50 text-[10px] font-bold text-slate-300 uppercase tracking-wider">
              {getStatusText(health.score)}
            </div>
          </div>
        </div>

        {/* TILT */}
        <div className="bg-[#0D1422] border border-slate-800 rounded-2xl p-5 flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Tilt</span>
            <div className="p-2 bg-slate-800/50 rounded-lg">
              <Wind className="w-4 h-4 text-cyan-400" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-light text-white mb-1">
              {Math.max(Math.abs(currentData.tiltX), Math.abs(currentData.tiltY)).toFixed(2)}<span className="text-sm text-slate-500 font-medium">°</span>
            </div>
            <div className="inline-flex items-center px-2 py-1 rounded bg-slate-800/50 border border-slate-700/50 text-[10px] font-bold text-slate-300 uppercase tracking-wider">
              {getStatusText(health.score)}
            </div>
          </div>
        </div>

        {/* ANOMALY */}
        <div className="bg-[#0D1422] border border-slate-800 rounded-2xl p-5 flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Anomaly</span>
            <div className="p-2 bg-slate-800/50 rounded-lg">
              <AlertTriangle className={clsx("w-4 h-4", health.anomalyProbability > 50 ? "text-amber-400" : "text-cyan-400")} />
            </div>
          </div>
          <div>
            <div className="text-3xl font-light text-white mb-1">
              {health.anomalyProbability}<span className="text-sm text-slate-500 font-medium">%</span>
            </div>
            <div className={clsx("inline-flex items-center px-2 py-1 rounded border text-[10px] font-bold uppercase tracking-wider",
              health.anomalyProbability < 30 ? "bg-slate-800/50 border-slate-700/50 text-slate-300" :
              health.anomalyProbability < 60 ? "bg-amber-500/10 border-amber-500/20 text-amber-500" :
              "bg-red-500/10 border-red-500/20 text-red-500"
            )}>
              {health.anomalyProbability < 30 ? 'LOW' : health.anomalyProbability < 60 ? 'MODERATE' : 'HIGH'}
            </div>
          </div>
        </div>

        {/* ENVIRONMENT */}
        <div className="bg-[#0D1422] border border-slate-800 rounded-2xl p-5 flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Environment</span>
            <div className="p-2 bg-slate-800/50 rounded-lg">
              <Droplets className="w-4 h-4 text-cyan-400" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-light text-white mb-1">
              {currentData.temperature.toFixed(1)}<span className="text-sm text-slate-500 font-medium">°C</span>
            </div>
            <div className="inline-flex items-center px-2 py-1 rounded bg-slate-800/50 border border-slate-700/50 text-[10px] font-bold text-slate-300 uppercase tracking-wider">
              NORMAL
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
