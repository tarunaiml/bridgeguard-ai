"use client";

import { useSimulation } from '@/context/SimulationContext';
import { Activity } from 'lucide-react';

export function Header() {
  const { currentData, mode } = useSimulation();

  return (
    <header className="bg-white border-b border-[#E2E8F0] z-50 sticky top-0 shadow-sm">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        
        {/* Left: Logo & Title */}
        <div className="flex items-center space-x-3">
          <div className="bg-[#eff6ff] p-2 rounded-lg">
            <Activity className="w-5 h-5 text-[#2563EB]" />
          </div>
          <div>
            <h1 className="text-[#111827] font-black tracking-widest text-sm uppercase">BridgeGuard AI</h1>
            <p className="text-[10px] text-[#64748B] uppercase tracking-widest font-bold">AI-Powered Structural Health Monitoring</p>
          </div>
        </div>

        {/* Right: Badges */}
        <div className="hidden lg:flex items-center space-x-4">
          <div className="flex items-center bg-[#F5F7FA] px-3 py-1.5 rounded-md border border-[#E2E8F0]">
            <div className="w-2 h-2 rounded-full bg-[#2563EB] animate-pulse mr-2"></div>
            <span className="text-[10px] font-bold text-[#2563EB] tracking-wider uppercase">PROTOTYPE MODE</span>
          </div>
          <span className="text-[10px] font-bold text-[#F59E0B] tracking-wider uppercase bg-[#fffbeb] border border-[#fef3c7] px-3 py-1.5 rounded-md">
            {mode === 'SIMULATION' ? 'SIMULATED DATA' : 'MANUAL DATA'}
          </span>
          <span className="text-[10px] text-[#64748B] font-mono">
            {currentData?.timestamp || '--:--:--'}
          </span>
        </div>
      </div>
    </header>
  );
}
