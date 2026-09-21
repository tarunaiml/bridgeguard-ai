"use client";

import { useSimulation } from '@/context/SimulationContext';
import clsx from 'clsx';

export function HeroStatus() {
  const { currentData, health } = useSimulation();

  if (!currentData || !health) return <div className="h-64 bg-white animate-pulse rounded-xl border border-[#E2E8F0] shadow-sm mb-8"></div>;

  const getStatusColor = (score: number) => {
    if (score > 75) return 'text-[#16A34A] stroke-[#16A34A]';
    if (score > 50) return 'text-[#F59E0B] stroke-[#F59E0B]';
    if (score > 30) return 'text-[#f97316] stroke-[#f97316]';
    return 'text-[#DC2626] stroke-[#DC2626]';
  };

  const getStatusText = (score: number) => {
    if (score > 75) return 'NORMAL';
    if (score > 50) return 'WARNING';
    if (score > 30) return 'ELEVATED';
    return 'CRITICAL';
  };

  const circumference = 2 * Math.PI * 65;
  const strokeDashoffset = circumference - (health.score / 100) * circumference;
  const colorClass = getStatusColor(health.score).split(' ')[0];

  return (
    <div className="mb-8 space-y-6">
      
      {/* Main Health Card */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-8 flex flex-col items-center justify-center shadow-sm relative">
        <h2 className="absolute top-6 left-6 text-xs font-bold text-[#64748B] tracking-widest uppercase">
          Bridge Health
        </h2>
        
        <div className="relative w-48 h-48 flex items-center justify-center mt-4">
          <svg className="w-full h-full transform -rotate-90">
            <circle cx="96" cy="96" r="65" className="stroke-[#F5F7FA]" strokeWidth="16" fill="transparent" />
            <circle
              cx="96" cy="96" r="65"
              className={clsx("transition-all duration-1000 ease-out", getStatusColor(health.score).split(' ')[1])}
              strokeWidth="16"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className={clsx("text-6xl font-black tracking-tighter", colorClass)}>
              {health.score}
            </span>
            <span className="text-[#64748B] text-sm font-bold uppercase tracking-widest mt-1">/ 100</span>
          </div>
        </div>
        
        <div className="mt-4 text-center">
          <div className={clsx("text-2xl font-black tracking-widest uppercase", colorClass)}>
            {health.condition}
          </div>
          <p className="text-xs font-bold text-[#111827] mt-3 uppercase tracking-wider">Prototype Health Score</p>
          <p className="text-xs text-[#64748B] mt-1 max-w-[280px]">
            Based on vibration, tilt and environmental indicators.
          </p>
        </div>
      </div>

      {/* Mini KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-sm">
          <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest mb-2">Vibration</div>
          <div className="text-2xl font-bold text-[#111827] mb-1">{currentData.rms.toFixed(2)} g</div>
          <div className={clsx("text-[10px] font-bold uppercase", colorClass)}>{getStatusText(health.score)}</div>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-sm">
          <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest mb-2">Tilt</div>
          <div className="text-2xl font-bold text-[#111827] mb-1">
            {Math.max(Math.abs(currentData.tiltX), Math.abs(currentData.tiltY)).toFixed(2)}°
          </div>
          <div className={clsx("text-[10px] font-bold uppercase", colorClass)}>{getStatusText(health.score)}</div>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-sm">
          <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest mb-2">Anomaly</div>
          <div className="text-2xl font-bold text-[#111827] mb-1">{health.anomalyProbability}%</div>
          <div className={clsx("text-[10px] font-bold uppercase", 
            health.anomalyProbability < 30 ? "text-[#16A34A]" : health.anomalyProbability < 60 ? "text-[#F59E0B]" : "text-[#DC2626]"
          )}>
            {health.anomalyProbability < 30 ? 'LOW' : health.anomalyProbability < 60 ? 'MODERATE' : 'HIGH'}
          </div>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-sm">
          <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest mb-2">Environment</div>
          <div className="text-2xl font-bold text-[#111827] mb-1">{currentData.temperature.toFixed(1)}°C</div>
          <div className="text-[10px] font-bold text-[#16A34A] uppercase">NORMAL</div>
        </div>

      </div>
    </div>
  );
}
