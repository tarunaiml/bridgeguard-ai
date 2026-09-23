"use client";

import { useState, useEffect } from 'react';
import { Database, Cpu, Activity, Zap } from 'lucide-react';

export function SystemStatus() {
  const [modelInfo, setModelInfo] = useState<any>(null);

  useEffect(() => {
    fetch('/api/model-info')
      .then(res => res.json())
      .then(data => setModelInfo(data))
      .catch(err => console.error(err));
  }, []);

  const isTrained = modelInfo?.trained;

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm mt-6">
      <h3 className="text-[#111827] font-bold uppercase text-xs tracking-widest mb-6">SYSTEM STATUS</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Data Source */}
        <div className="bg-[#F5F7FA] p-4 rounded-lg border border-[#E2E8F0] flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-3 text-[#64748B]">
            <Database className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Data Source</span>
          </div>
          <span className="text-sm font-bold text-[#111827]">Ponneri Bridge SHM</span>
        </div>

        {/* ML Model */}
        <div className="bg-[#F5F7FA] p-4 rounded-lg border border-[#E2E8F0] flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-3 text-[#64748B]">
            <Cpu className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest">ML Model</span>
          </div>
          <span className="text-sm font-bold text-[#111827]">
            {isTrained ? (modelInfo?.model || 'Logistic Regression') : 'Not Trained'}
          </span>
        </div>

        {/* SHAP */}
        <div className="bg-[#F5F7FA] p-4 rounded-lg border border-[#E2E8F0] flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-3 text-[#64748B]">
            <Activity className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest">SHAP</span>
          </div>
          <span className="text-sm font-bold text-[#111827]">
            {isTrained ? 'Connected' : 'Unavailable'}
          </span>
        </div>

        {/* Hardware */}
        <div className="bg-[#eff6ff] p-4 rounded-lg border border-[#bfdbfe] flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-3 text-[#1D4ED8]">
            <Zap className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Hardware</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] font-bold text-[#1E3A8A]">ESP32 + MPU6050 + DHT11</span>
            <span className="text-[9px] font-bold text-[#3B82F6] uppercase tracking-widest mt-1">Planned / In Development</span>
          </div>
        </div>

      </div>
    </div>
  );
}
