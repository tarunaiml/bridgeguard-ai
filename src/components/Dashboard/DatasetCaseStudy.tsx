"use client";

import { Database, ArrowRight } from "lucide-react";

export function DatasetCaseStudy() {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden shadow-sm flex flex-col">
      <div className="flex flex-col lg:flex-row">
        
        {/* Left: Illustrative Image */}
        <div className="lg:w-1/3 relative bg-[#111827] min-h-[250px] lg:min-h-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="https://images.unsplash.com/photo-1544253303-3d07e2a969db?auto=format&fit=crop&q=80&w=800" 
            alt="Illustrative railway bridge" 
            className="absolute inset-0 w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/90 to-transparent"></div>
          <div className="absolute bottom-4 left-4 right-4">
            <span className="text-[9px] font-bold uppercase tracking-widest text-white/90 bg-black/60 px-2 py-1 rounded backdrop-blur-sm border border-white/10">
              Illustrative bridge image — not the Vänersborg Bridge
            </span>
          </div>
        </div>

        {/* Right: Dataset Info */}
        <div className="lg:w-2/3 p-6 sm:p-8">
          <div className="flex items-center space-x-2 mb-2">
            <Database className="w-5 h-5 text-[#2563EB]" />
            <h3 className="text-[#111827] font-bold uppercase text-xs tracking-widest">REAL-WORLD DATASET</h3>
          </div>
          
          <h4 className="text-2xl font-black text-[#111827] mb-1">Vänersborg Bridge SHM Dataset</h4>
          <p className="text-sm font-bold text-[#64748B] mb-8 uppercase tracking-widest">Sweden</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 mb-8">
            <div className="flex items-start text-sm font-medium text-[#111827]">
              <div className="w-1.5 h-1.5 rounded-full bg-[#2563EB] mt-1.5 mr-3 shrink-0"></div>
              64 monitored events
            </div>
            <div className="flex items-start text-sm font-medium text-[#111827]">
              <div className="w-1.5 h-1.5 rounded-full bg-[#2563EB] mt-1.5 mr-3 shrink-0"></div>
              Real sensor measurements
            </div>
            <div className="flex items-start text-sm font-medium text-[#111827]">
              <div className="w-1.5 h-1.5 rounded-full bg-[#DC2626] mt-1.5 mr-3 shrink-0"></div>
              Verified fracture event
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-6 border-t border-[#E2E8F0]">
            <div className="mb-4 sm:mb-0">
              <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest block">DOI: 10.5281/zenodo.8300495</span>
            </div>
            <a 
              href="https://zenodo.org/records/8300495" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-lg font-bold text-sm transition-colors shadow-sm uppercase tracking-widest"
            >
              VIEW DATASET
            </a>
          </div>

        </div>
      </div>

      <div className="bg-[#F5F7FA] border-t border-[#E2E8F0] p-6 sm:p-8">
        <h4 className="text-[#111827] font-bold uppercase text-xs tracking-widest mb-4">WHAT DOES THE REAL DATA MEAN?</h4>
        <div className="text-sm text-[#64748B] leading-relaxed mb-8 space-y-4 max-w-3xl">
          <p>The Vänersborg Bridge dataset contains structural health monitoring measurements collected from a monitored railway bridge in Sweden.</p>
          <p>The measurements include acceleration/vibration, strain, inclination and environmental information across bridge-opening events, including data surrounding a verified structural fracture.</p>
          <p>BridgeGuard AI uses this dataset as a real-world reference for developing and evaluating abnormal structural-behaviour detection.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-2 text-[10px] sm:text-xs font-bold text-[#111827] tracking-widest uppercase mb-10 bg-white p-4 rounded-xl border border-[#E2E8F0] shadow-sm overflow-x-auto">
          <span className="shrink-0">REAL DATA</span>
          <ArrowRight className="w-3 h-3 text-[#64748B] shrink-0" />
          <span className="shrink-0">SIGNAL PROCESSING</span>
          <ArrowRight className="w-3 h-3 text-[#64748B] shrink-0" />
          <span className="shrink-0">FEATURE EXTRACTION</span>
          <ArrowRight className="w-3 h-3 text-[#64748B] shrink-0" />
          <span className="shrink-0 text-[#2563EB]">RANDOM FOREST</span>
          <ArrowRight className="w-3 h-3 text-[#64748B] shrink-0" />
          <span className="shrink-0">NORMAL / ABNORMAL</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-[#E2E8F0] p-5 rounded-xl shadow-sm">
            <div className="text-xs font-bold text-[#111827] uppercase tracking-widest mb-4 pb-3 border-b border-[#F5F7FA]">PROTOTYPE MODE</div>
            <div className="flex flex-col space-y-3 text-xs font-medium text-[#64748B]">
              <div className="flex items-center"><span className="w-5 text-center text-[#2563EB] font-bold mr-2">1</span> Simulation</div>
              <div className="flex items-center"><span className="w-5 text-center text-[#2563EB] font-bold mr-2">2</span> Dashboard demonstration</div>
              <div className="flex items-center"><span className="w-5 text-center text-[#2563EB] font-bold mr-2">3</span> Prototype Health Score</div>
            </div>
          </div>
          <div className="bg-white border border-[#E2E8F0] p-5 rounded-xl shadow-sm">
            <div className="text-xs font-bold text-[#111827] uppercase tracking-widest mb-4 pb-3 border-b border-[#F5F7FA]">REAL DATA MODE</div>
            <div className="flex flex-col space-y-3 text-xs font-medium text-[#64748B]">
              <div className="flex items-center"><span className="w-5 text-center text-[#2563EB] font-bold mr-2">1</span> Vänersborg SHM</div>
              <div className="flex items-center"><span className="w-5 text-center text-[#2563EB] font-bold mr-2">2</span> Feature extraction</div>
              <div className="flex items-center"><span className="w-5 text-center text-[#2563EB] font-bold mr-2">3</span> Machine Learning</div>
              <div className="flex items-center"><span className="w-5 text-center text-[#2563EB] font-bold mr-2">4</span> Normal / Abnormal detection</div>
            </div>
          </div>
        </div>
        
        <p className="text-[11px] text-[#64748B] leading-relaxed mt-6 font-medium bg-white p-4 rounded-lg border border-[#E2E8F0]">
          Simulation demonstrates the interface. Real SHM data supports development and evaluation of the machine-learning pipeline. Future ESP32 sensors will provide live project-specific measurements.
        </p>
      </div>
    </div>
  );
}
