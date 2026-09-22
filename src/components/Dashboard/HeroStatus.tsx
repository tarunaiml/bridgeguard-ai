"use client";

import { useSimulation } from '@/context/SimulationContext';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import { Info, X } from 'lucide-react';

export function HeroStatus() {
  const { currentData, health } = useSimulation();
  const [showCalculation, setShowCalculation] = useState(false);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (showCalculation) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [showCalculation]);

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

  const gaugeRadius = 60;
  const circumference = 2 * Math.PI * gaugeRadius;
  const strokeDashoffset = circumference - (health.score / 100) * circumference;
  const colorClass = getStatusColor(health.score).split(' ')[0];

  return (
    <div className="space-y-6">
      
      {/* Main Health Card - Strict Vertical Layout */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 sm:p-8 shadow-sm flex flex-col items-center text-center">
        
        <h2 className="text-[10px] sm:text-xs font-bold text-[#64748B] tracking-widest uppercase mb-6">
          Bridge Health
        </h2>
        
        {/* Gauge Container: Fixed Size, Center Score inside */}
        <div className="relative w-[140px] h-[140px] sm:w-[160px] sm:h-[160px] flex items-center justify-center mb-6">
          <svg className="w-full h-full transform -rotate-90">
            <circle cx="50%" cy="50%" r={gaugeRadius} className="stroke-[#F5F7FA]" strokeWidth="12" fill="transparent" />
            <circle
              cx="50%" cy="50%" r={gaugeRadius}
              className={clsx("transition-all duration-1000 ease-out", getStatusColor(health.score).split(' ')[1])}
              strokeWidth="12"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={clsx("text-4xl sm:text-5xl font-black tracking-tighter leading-none", colorClass)}>
              {health.score}
            </span>
            <span className="text-[#64748B] text-[10px] sm:text-xs font-bold uppercase tracking-widest mt-1">/ 100</span>
          </div>
        </div>
        
        {/* Condition Text Below Gauge */}
        <div className={clsx("text-xl sm:text-2xl font-black tracking-widest uppercase mb-4 flex items-center justify-center gap-2", colorClass)}>
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: 'currentColor' }}></span>
          {health.condition}
        </div>
        
        <p className="text-[10px] sm:text-xs font-bold text-[#111827] uppercase tracking-wider mb-2">
          PROTOTYPE HEALTH SCORE
        </p>
        
        <p className="text-xs sm:text-sm text-[#64748B] max-w-sm mx-auto mb-6 leading-relaxed">
          Based on vibration, tilt, frequency and environmental indicators.
        </p>
        
        <button 
          onClick={() => setShowCalculation(true)}
          className="flex items-center space-x-2 px-6 py-2.5 bg-[#F5F7FA] border border-[#E2E8F0] rounded-lg text-xs font-bold text-[#64748B] hover:text-[#2563EB] hover:bg-[#eff6ff] hover:border-[#bfdbfe] transition-colors"
        >
          <Info className="w-4 h-4" />
          <span>How is this calculated?</span>
        </button>
      </div>

      {/* Mini KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-sm">
          <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest mb-2">Vibration</div>
          <div className="text-xl sm:text-2xl font-bold text-[#111827] mb-1">{currentData.rms.toFixed(2)} g</div>
          <div className={clsx("text-[9px] sm:text-[10px] font-bold uppercase", colorClass)}>{getStatusText(health.score)}</div>
        </div>
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-sm">
          <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest mb-2">Tilt</div>
          <div className="text-xl sm:text-2xl font-bold text-[#111827] mb-1">
            {Math.max(Math.abs(currentData.tiltX), Math.abs(currentData.tiltY)).toFixed(2)}°
          </div>
          <div className={clsx("text-[9px] sm:text-[10px] font-bold uppercase", colorClass)}>{getStatusText(health.score)}</div>
        </div>
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-sm">
          <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest mb-2">Anomaly</div>
          <div className="text-xl sm:text-2xl font-bold text-[#111827] mb-1">{health.anomalyProbability}%</div>
          <div className={clsx("text-[9px] sm:text-[10px] font-bold uppercase", 
            health.anomalyProbability < 30 ? "text-[#16A34A]" : health.anomalyProbability < 60 ? "text-[#F59E0B]" : "text-[#DC2626]"
          )}>
            {health.anomalyProbability < 30 ? 'LOW' : health.anomalyProbability < 60 ? 'MODERATE' : 'HIGH'}
          </div>
        </div>
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-sm">
          <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest mb-2">Environment</div>
          <div className="text-xl sm:text-2xl font-bold text-[#111827] mb-1">{currentData.temperature.toFixed(1)}°C</div>
          <div className="text-[9px] sm:text-[10px] font-bold text-[#16A34A] uppercase">NORMAL</div>
        </div>
      </div>

      {/* Proper Centered Modal via Portal */}
      {showCalculation && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Darkened Backdrop */}
          <div 
            className="absolute inset-0 bg-[#000000]/60 backdrop-blur-sm"
            onClick={() => setShowCalculation(false)}
          ></div>
          
          {/* Modal Content */}
          <div className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col max-h-[85vh] border border-[#E2E8F0] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-[#E2E8F0] bg-[#F5F7FA] shrink-0">
              <h3 className="font-bold text-[#111827] text-sm tracking-wide">Prototype Score Calculation</h3>
              <button onClick={() => setShowCalculation(false)} className="text-[#64748B] hover:text-[#111827] p-1 rounded-md hover:bg-[#E2E8F0] transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Modal Body (Scrollable) */}
            <div className="p-6 overflow-y-auto bg-white">
              
              {/* Visual Flow */}
              <div className="flex flex-col items-center justify-center space-y-3 mb-8">
                <div className="bg-[#F5F7FA] text-[#111827] text-xs font-bold tracking-widest uppercase px-6 py-3 rounded-xl border border-[#E2E8F0] shadow-sm w-64 text-center">
                  Sensor measurements
                </div>
                <div className="text-[#64748B] font-bold">↓</div>
                <div className="bg-[#F5F7FA] text-[#111827] text-xs font-bold tracking-widest uppercase px-6 py-3 rounded-xl border border-[#E2E8F0] shadow-sm w-64 text-center">
                  Feature extraction
                </div>
                <div className="text-[#64748B] font-bold">↓</div>
                <div className="bg-[#F5F7FA] text-[#111827] text-xs font-bold tracking-widest uppercase px-6 py-3 rounded-xl border border-[#E2E8F0] shadow-sm w-64 text-center">
                  Healthy baseline comparison
                </div>
                <div className="text-[#64748B] font-bold">↓</div>
                <div className="bg-[#F5F7FA] text-[#111827] text-xs font-bold tracking-widest uppercase px-6 py-3 rounded-xl border border-[#E2E8F0] shadow-sm w-64 text-center">
                  Component scores
                </div>
                <div className="text-[#64748B] font-bold">↓</div>
                <div className="bg-[#F5F7FA] text-[#111827] text-xs font-bold tracking-widest uppercase px-6 py-3 rounded-xl border border-[#E2E8F0] shadow-sm w-64 text-center">
                  Weighted score
                </div>
                <div className="text-[#2563EB] font-bold">↓</div>
                <div className="bg-[#eff6ff] text-[#1D4ED8] text-sm font-black tracking-widest uppercase px-8 py-4 rounded-xl border border-[#bfdbfe] shadow-sm w-64 text-center">
                  {health.score} / 100
                </div>
              </div>

              {/* Weight Breakdown */}
              <div className="space-y-4 mb-8">
                <h4 className="text-xs font-bold text-[#111827] uppercase tracking-wider mb-3">Weight Breakdown</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex justify-between items-center p-4 bg-[#F5F7FA] rounded-xl border border-[#E2E8F0]">
                    <span className="text-xs font-bold text-[#111827]">Vibration stability</span>
                    <span className="text-xs font-black text-[#2563EB]">40%</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-[#F5F7FA] rounded-xl border border-[#E2E8F0]">
                    <span className="text-xs font-bold text-[#111827]">Tilt stability</span>
                    <span className="text-xs font-black text-[#2563EB]">25%</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-[#F5F7FA] rounded-xl border border-[#E2E8F0]">
                    <span className="text-xs font-bold text-[#111827]">Frequency stability</span>
                    <span className="text-xs font-black text-[#2563EB]">20%</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-[#F5F7FA] rounded-xl border border-[#E2E8F0]">
                    <span className="text-xs font-bold text-[#111827]">Environmental stability</span>
                    <span className="text-xs font-black text-[#2563EB]">15%</span>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-[#F5F7FA] rounded-xl border border-[#E2E8F0] text-center font-mono text-xs font-bold text-[#64748B]">
                  Health = 0.40V + 0.25T + 0.20F + 0.15E
                </div>
              </div>

              {/* Disclaimer */}
              <div className="bg-[#fffbeb] border border-[#fde68a] p-5 rounded-xl text-[11px] sm:text-xs text-[#d97706] font-medium leading-relaxed">
                <span className="font-bold uppercase tracking-wider block mb-2 text-[#b45309]">IMPORTANT</span>
                This weighting is defined for the BridgeGuard ML academic prototype and is not a standardized bridge engineering formula. This 0–100 score is a project-specific prototype indicator. It is not a certified engineering safety rating and should not be interpreted as a real bridge safety certification.
              </div>
            </div>
            
            {/* Modal Footer */}
            <div className="p-4 border-t border-[#E2E8F0] bg-[#F5F7FA] flex justify-end shrink-0">
              <button 
                onClick={() => setShowCalculation(false)}
                className="px-6 py-2 bg-white border border-[#E2E8F0] rounded-lg text-xs font-bold text-[#111827] shadow-sm hover:bg-[#E2E8F0] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
