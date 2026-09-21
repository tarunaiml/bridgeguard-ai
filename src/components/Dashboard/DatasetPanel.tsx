"use client";

import { Database } from "lucide-react";

export function DatasetPanel() {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm mb-8">
      <div className="flex items-center space-x-2 mb-6">
        <Database className="w-5 h-5 text-[#2563EB]" />
        <h3 className="text-[#111827] font-bold uppercase text-xs tracking-widest">REAL DATASET</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h4 className="text-lg font-black text-[#111827] mb-2">Vänersborg Bridge SHM Dataset</h4>
          <p className="text-sm text-[#64748B] mb-4">Dataset from structural health monitoring of a steel bridge in Sweden.</p>
          
          <div className="space-y-2 text-sm font-medium">
            <div className="flex justify-between border-b border-[#E2E8F0] pb-2">
              <span className="text-[#64748B]">Source:</span>
              <span className="text-[#111827]">Zenodo</span>
            </div>
            <div className="flex justify-between border-b border-[#E2E8F0] pb-2">
              <span className="text-[#64748B]">DOI:</span>
              <a href="https://doi.org/10.5281/zenodo.8300495" target="_blank" rel="noopener noreferrer" className="text-[#2563EB] hover:underline">10.5281/zenodo.8300495</a>
            </div>
            <div className="flex justify-between border-b border-[#E2E8F0] pb-2">
              <span className="text-[#64748B]">Events:</span>
              <span className="text-[#111827]">64 bridge opening events</span>
            </div>
            <div className="flex justify-between border-b border-[#E2E8F0] pb-2">
              <span className="text-[#64748B]">Damage:</span>
              <span className="text-[#111827]">Verified fracture</span>
            </div>
            <div className="flex justify-between pb-2">
              <span className="text-[#64748B]">Classification:</span>
              <span className="text-[#111827]">Pre-fracture vs post-fracture</span>
            </div>
          </div>
        </div>

        <div className="bg-[#F5F7FA] border border-[#E2E8F0] rounded-lg p-5">
          <h5 className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest mb-3">Measurements</h5>
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="px-2 py-1 bg-white border border-[#E2E8F0] rounded text-xs font-bold text-[#111827]">Acceleration</span>
            <span className="px-2 py-1 bg-white border border-[#E2E8F0] rounded text-xs font-bold text-[#111827]">Strain</span>
            <span className="px-2 py-1 bg-white border border-[#E2E8F0] rounded text-xs font-bold text-[#111827]">Inclination</span>
            <span className="px-2 py-1 bg-white border border-[#E2E8F0] rounded text-xs font-bold text-[#111827]">Weather</span>
          </div>

          <h5 className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest mb-3">Model Status</h5>
          <div className="bg-white border border-[#E2E8F0] rounded p-3 text-xs font-bold text-[#111827]">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[#64748B]">Prototype Engine:</span>
              <span className="text-[#16A34A]">ACTIVE</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#64748B]">Real Dataset Model:</span>
              <span className="text-[#F59E0B]">NOT TRAINED</span>
            </div>
          </div>
          <p className="text-[10px] text-[#64748B] font-medium mt-3 text-center">
            Pending dataset training.
          </p>
        </div>
      </div>
    </div>
  );
}
