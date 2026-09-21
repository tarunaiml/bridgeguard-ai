"use client";

import { Database, ArrowRight, ImageOff } from "lucide-react";
import { useState } from "react";

export function DatasetCaseStudy() {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden shadow-sm flex flex-col">
      <div className="flex flex-col lg:flex-row">
        
        {/* Left: Illustrative Image */}
        <div className="lg:w-1/2 p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-[#E2E8F0] flex flex-col items-center justify-center">
          <div className="w-full relative rounded-xl overflow-hidden bg-[#F5F7FA] border border-[#E2E8F0]" style={{ aspectRatio: '16/9' }}>
            {!imageError ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img 
                src="/images/vanersborg-bridge.jpg" 
                alt="Vänersborg Bridge illustrative imagery" 
                className="absolute inset-0 w-full h-full object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-[#64748B]">
                <ImageOff className="w-12 h-12 mb-3 text-[#CBD5E1]" />
                <span className="text-xs font-bold uppercase tracking-widest">Bridge Image</span>
                <span className="text-[10px] font-medium">Image unavailable</span>
                <span className="text-[10px] font-medium">Vänersborg SHM Dataset</span>
              </div>
            )}
          </div>
          <p className="text-[10px] font-medium text-[#64748B] mt-4 text-center px-4">
            Illustrative bridge imagery — see dataset source for the monitored SHM structure.
          </p>
        </div>

        {/* Right: Dataset Info */}
        <div className="lg:w-1/2 p-6 sm:p-8 flex flex-col justify-center">
          <div className="flex items-center space-x-2 mb-2">
            <Database className="w-5 h-5 text-[#2563EB]" />
            <h3 className="text-[#111827] font-bold uppercase text-xs tracking-widest">REAL-WORLD DATASET</h3>
          </div>
          
          <h4 className="text-2xl font-black text-[#111827] mb-1">Vänersborg Bridge SHM Dataset</h4>
          <p className="text-sm font-bold text-[#64748B] mb-8 uppercase tracking-widest">Sweden</p>
          
          <ul className="space-y-3 mb-8 text-sm font-medium text-[#111827]">
            <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] mr-3 shrink-0"></span>64 monitored events</li>
            <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] mr-3 shrink-0"></span>Real sensor measurements</li>
            <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] mr-3 shrink-0"></span>Acceleration / vibration</li>
            <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] mr-3 shrink-0"></span>Strain</li>
            <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] mr-3 shrink-0"></span>Inclination</li>
            <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] mr-3 shrink-0"></span>Environmental data</li>
            <li className="flex items-center text-[#DC2626] font-bold"><span className="w-1.5 h-1.5 rounded-full bg-[#DC2626] mr-3 shrink-0"></span>Verified structural fracture</li>
          </ul>

          <div className="pt-6 border-t border-[#E2E8F0]">
            <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4">
              <div>
                <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest block mb-1">Dataset: Zenodo</span>
                <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest block">DOI: 10.5281/zenodo.8300495</span>
              </div>
              <a 
                href="https://zenodo.org/records/8300495" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-lg font-bold text-sm transition-colors shadow-sm uppercase tracking-widest shrink-0"
              >
                VIEW DATASET
              </a>
            </div>
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
      </div>
    </div>
  );
}
