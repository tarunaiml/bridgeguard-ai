"use client";

import { useSimulation } from '@/context/SimulationContext';
import { useState } from 'react';
import clsx from 'clsx';
import { Info, X } from 'lucide-react';

export function HeroStatus() {
  const { currentData, health } = useSimulation();
  const [showCalculation, setShowCalculation] = useState(false);

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

  const circumference = 2 * Math.PI * 55;
  const strokeDashoffset = circumference - (health.score / 100) * circumference;
  const colorClass = getStatusColor(health.score).split(' ')[0];

  return (
    <div className="mb-8 space-y-6 relative">
      
      {/* Main Health Card */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-8 flex flex-col items-center justify-center shadow-sm relative">
        <button 
          onClick={() => setShowCalculation(true)}
          className="absolute top-4 right-4 flex items-center space-x-1 px-3 py-1.5 bg-[#F5F7FA] border border-[#E2E8F0] rounded-lg text-xs font-bold text-[#64748B] hover:text-[#2563EB] transition-colors"
        >
          <Info className="w-3.5 h-3.5" />
          <span>How is this calculated?</span>
        </button>

        {/* Gauge area with fixed sizing to prevent overlap */}
        <div className="relative w-40 h-40 flex items-center justify-center mb-6">
          <svg className="w-full h-full transform -rotate-90">
            <circle cx="80" cy="80" r="55" className="stroke-[#F5F7FA]" strokeWidth="12" fill="transparent" />
            <circle
              cx="80" cy="80" r="55"
              className={clsx("transition-all duration-1000 ease-out", getStatusColor(health.score).split(' ')[1])}
              strokeWidth="12"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest mb-1">Health Score</span>
            <div className="flex items-baseline">
              <span className={clsx("text-4xl font-black tracking-tighter", colorClass)}>
                {health.score}
              </span>
              <span className="text-[#64748B] text-sm font-bold uppercase tracking-widest ml-1">/ 100</span>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <h2 className="text-xs font-bold text-[#64748B] tracking-widest uppercase mb-1">
            Bridge Health
          </h2>
          <div className={clsx("text-2xl font-black tracking-widest uppercase mb-4", colorClass)}>
            {health.condition}
          </div>
          <p className="text-xs font-bold text-[#111827] uppercase tracking-wider mb-1">Prototype Health Score</p>
          <p className="text-xs text-[#64748B] max-w-[320px] mx-auto">
            Based on vibration, tilt, frequency and environmental indicators.
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

      {/* Calculation Modal */}
      {showCalculation && (
        <div className="fixed inset-0 bg-[#111827]/40 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-xl max-w-lg w-full overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-5 border-b border-[#E2E8F0] flex justify-between items-center bg-[#F5F7FA]">
              <h3 className="font-bold text-[#111827] text-sm tracking-wide">Prototype Score Calculation</h3>
              <button onClick={() => setShowCalculation(false)} className="text-[#64748B] hover:text-[#111827] p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <div className="flex flex-col items-center justify-center space-y-2 mb-8 text-xs font-bold text-[#64748B] tracking-widest">
                <div className="bg-[#F5F7FA] px-4 py-2 rounded-lg border border-[#E2E8F0]">RAW SENSOR DATA</div>
                <div>↓</div>
                <div className="bg-[#F5F7FA] px-4 py-2 rounded-lg border border-[#E2E8F0]">FEATURE EXTRACTION</div>
                <div>↓</div>
                <div className="bg-[#F5F7FA] px-4 py-2 rounded-lg border border-[#E2E8F0]">BASELINE COMPARISON</div>
                <div>↓</div>
                <div className="bg-[#F5F7FA] px-4 py-2 rounded-lg border border-[#E2E8F0]">ANOMALY / DAMAGE MODEL</div>
                <div>↓</div>
                <div className="bg-[#eff6ff] text-[#2563EB] px-4 py-2 rounded-lg border border-[#bfdbfe]">HEALTH SCORE</div>
              </div>

              <div className="space-y-4 mb-6">
                <h4 className="text-xs font-bold text-[#111827] uppercase tracking-wider mb-2">Score Breakdown</h4>
                
                <div className="flex justify-between items-center p-3 bg-[#F5F7FA] rounded-lg border border-[#E2E8F0]">
                  <div>
                    <div className="text-sm font-bold text-[#111827]">Vibration</div>
                    <div className="text-[10px] text-[#64748B] uppercase tracking-wider">40% weight</div>
                  </div>
                  <div className="text-lg font-black text-[#2563EB]">{health.breakdown?.vibrationScore} <span className="text-sm text-[#64748B]">/ 100</span></div>
                </div>

                <div className="flex justify-between items-center p-3 bg-[#F5F7FA] rounded-lg border border-[#E2E8F0]">
                  <div>
                    <div className="text-sm font-bold text-[#111827]">Tilt</div>
                    <div className="text-[10px] text-[#64748B] uppercase tracking-wider">25% weight</div>
                  </div>
                  <div className="text-lg font-black text-[#2563EB]">{health.breakdown?.tiltScore} <span className="text-sm text-[#64748B]">/ 100</span></div>
                </div>

                <div className="flex justify-between items-center p-3 bg-[#F5F7FA] rounded-lg border border-[#E2E8F0]">
                  <div>
                    <div className="text-sm font-bold text-[#111827]">Frequency</div>
                    <div className="text-[10px] text-[#64748B] uppercase tracking-wider">20% weight</div>
                  </div>
                  <div className="text-lg font-black text-[#2563EB]">{health.breakdown?.freqScore} <span className="text-sm text-[#64748B]">/ 100</span></div>
                </div>

                <div className="flex justify-between items-center p-3 bg-[#F5F7FA] rounded-lg border border-[#E2E8F0]">
                  <div>
                    <div className="text-sm font-bold text-[#111827]">Environment</div>
                    <div className="text-[10px] text-[#64748B] uppercase tracking-wider">15% weight</div>
                  </div>
                  <div className="text-lg font-black text-[#2563EB]">{health.breakdown?.envScore} <span className="text-sm text-[#64748B]">/ 100</span></div>
                </div>

                <div className="flex justify-between items-center p-4 bg-[#eff6ff] rounded-lg border border-[#bfdbfe] mt-4">
                  <div className="text-sm font-bold text-[#1D4ED8] uppercase tracking-wider">Final Health Score</div>
                  <div className="text-2xl font-black text-[#1D4ED8]">{health.score} <span className="text-sm text-[#3b82f6]">/ 100</span></div>
                </div>
              </div>

              <div className="bg-[#fffbeb] border border-[#fde68a] p-4 rounded-lg text-[11px] text-[#d97706] font-medium leading-relaxed">
                <span className="font-bold uppercase tracking-wider block mb-1">Important Note</span>
                These weights are prototype assumptions for this academic demonstration and are not a standardized bridge safety rating. Real-world assessment requires empirical data calibration.
              </div>
            </div>
            
            <div className="p-4 border-t border-[#E2E8F0] bg-[#F5F7FA] flex justify-end">
              <button 
                onClick={() => setShowCalculation(false)}
                className="px-6 py-2 bg-white border border-[#E2E8F0] rounded-lg text-xs font-bold text-[#111827] shadow-sm hover:bg-[#F5F7FA] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
