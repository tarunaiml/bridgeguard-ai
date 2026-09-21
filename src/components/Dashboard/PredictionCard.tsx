"use client";

import { useSimulation } from '@/context/SimulationContext';
import clsx from 'clsx';
import { BrainCircuit } from 'lucide-react';

export function PredictionCard() {
  const { health, mode } = useSimulation();

  if (!health) return null;

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm flex flex-col h-full">
      <div className="mb-6 flex items-center space-x-2">
        <BrainCircuit className="w-5 h-5 text-[#2563EB]" />
        <h3 className="text-[#111827] font-bold uppercase text-xs tracking-widest">
          AI Damage Detection
        </h3>
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center border-b border-[#E2E8F0] pb-2">
          <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest">Model</span>
          <span className="text-sm font-bold text-[#111827]">Random Forest Classifier</span>
        </div>
        <div className="flex justify-between items-center border-b border-[#E2E8F0] pb-2">
          <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest">Dataset</span>
          <span className="text-sm font-bold text-[#111827]">Vänersborg Bridge SHM</span>
        </div>
        <div className="flex justify-between items-center border-b border-[#E2E8F0] pb-2">
          <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest">Task</span>
          <span className="text-sm font-bold text-[#111827]">Normal vs Abnormal Behaviour</span>
        </div>
        <div className="flex justify-between items-center pt-2">
          <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest">Current Status</span>
          <span className="text-[10px] font-bold uppercase tracking-widest bg-[#fffbeb] text-[#F59E0B] border border-[#fde68a] px-2 py-1 rounded">
            ● NOT TRAINED
          </span>
        </div>
      </div>

      <div className="bg-[#F5F7FA] border border-[#E2E8F0] rounded-lg p-4 mb-4 text-center">
        <p className="text-xs font-medium text-[#64748B]">
          Real model metrics will appear here after training and evaluation on the real SHM dataset.
        </p>
      </div>

      <div className="mt-auto border-t border-[#E2E8F0] pt-4">
        <p className="text-[10px] text-[#64748B] leading-relaxed italic">
          <strong>Research Note:</strong> BridgeGuard AI currently focuses on detecting abnormal structural behaviour from SHM data. Detection of abnormal behaviour should not be interpreted as prediction of bridge collapse.
        </p>
      </div>
    </div>
  );
}
