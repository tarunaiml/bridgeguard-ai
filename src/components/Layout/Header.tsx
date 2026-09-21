"use client";

import { Activity, Database } from 'lucide-react';
import { useSimulation } from '@/context/SimulationContext';

export function Header() {
  const { mode } = useSimulation();
  
  return (
    <header className="bg-white border-b border-[#E2E8F0] sticky top-0 z-40">
      <div className="max-w-[1000px] mx-auto px-4 md:px-0 h-16 flex items-center justify-between">
        
        {/* Left: Logo */}
        <div className="flex items-center space-x-3">
          <div className="bg-[#eff6ff] p-2 rounded-lg">
            <Activity className="w-5 h-5 text-[#2563EB]" />
          </div>
          <div>
            <h1 className="text-[#111827] font-black tracking-widest text-sm uppercase">BridgeGuard AI</h1>
            <p className="text-[10px] text-[#64748B] uppercase tracking-widest font-bold hidden sm:block">AI-Powered Structural Health Monitoring</p>
          </div>
        </div>

        {/* Right: Badges */}
        <div className="flex items-center space-x-4">
          <div className="flex flex-col items-end">
            <div className="flex items-center space-x-1.5 bg-[#F5F7FA] border border-[#E2E8F0] px-3 py-1.5 rounded-lg shadow-sm">
              <Database className="w-3 h-3 text-[#64748B]" />
              <span className="text-[9px] font-bold text-[#64748B] uppercase tracking-widest">DATA SOURCE:</span>
              <span className="text-[9px] font-bold text-[#2563EB] uppercase tracking-widest">{mode}</span>
            </div>
          </div>
        </div>

      </div>
    </header>
  );
}
