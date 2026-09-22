"use client";

import { useSimulation } from '@/context/SimulationContext';
import { BrainCircuit } from 'lucide-react';

export function PredictionCard() {
  const { health } = useSimulation();

  if (!health) return null;

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm flex flex-col h-full">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <BrainCircuit className="w-5 h-5 text-[#2563EB]" />
          <h3 className="text-[#111827] font-bold uppercase text-xs tracking-widest">
            AI PREDICTION
          </h3>
        </div>
        <span className="flex items-center text-[10px] font-bold uppercase tracking-widest bg-[#F5F7FA] text-[#64748B] border border-[#E2E8F0] px-2.5 py-1 rounded w-fit">
          <span className="w-1.5 h-1.5 rounded-full bg-[#64748B] mr-1.5"></span>
          NOT TRAINED
        </span>
      </div>

      <div className="space-y-4 mb-6 flex-1">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-[#E2E8F0] pb-3 gap-1">
          <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest">Condition</span>
          <span className="text-sm font-bold text-[#111827] opacity-50 italic">Waiting for model...</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-[#E2E8F0] pb-3 gap-1">
          <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest">Selected Model</span>
          <span className="text-sm font-bold text-[#111827] opacity-50 italic">Pending Comparison</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-[#E2E8F0] pb-3 gap-1">
          <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest">Confidence</span>
          <span className="text-sm font-bold text-[#111827] opacity-50 italic">N/A</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pt-1 gap-1">
          <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest">Dataset</span>
          <span className="text-sm font-bold text-[#111827]">Vänersborg Bridge SHM</span>
        </div>
      </div>

      <div className="bg-[#F5F7FA] border border-[#E2E8F0] rounded-lg p-5 text-center mt-2">
        <p className="text-xs font-medium text-[#64748B] leading-relaxed">
          Real ML prediction will appear after the selected model is trained and validated.
        </p>
      </div>
    </div>
  );
}
