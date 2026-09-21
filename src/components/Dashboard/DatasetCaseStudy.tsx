"use client";

import { Database, Image as ImageIcon } from "lucide-react";

export function DatasetCaseStudy() {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden shadow-sm mb-8">
      <div className="flex flex-col md:flex-row">
        
        {/* Left: Illustrative Image */}
        <div className="md:w-1/3 relative bg-[#111827] min-h-[250px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="https://images.unsplash.com/photo-1544253303-3d07e2a969db?auto=format&fit=crop&q=80&w=800" 
            alt="Illustrative railway bridge" 
            className="absolute inset-0 w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/90 to-transparent"></div>
          <div className="absolute bottom-4 left-4 right-4">
            <span className="text-[9px] font-bold uppercase tracking-widest text-white/70 bg-black/40 px-2 py-1 rounded backdrop-blur-sm">
              Illustrative bridge image
            </span>
          </div>
        </div>

        {/* Right: Dataset Info */}
        <div className="md:w-2/3 p-6 md:p-8">
          <div className="flex items-center space-x-2 mb-2">
            <Database className="w-5 h-5 text-[#2563EB]" />
            <h3 className="text-[#111827] font-bold uppercase text-xs tracking-widest">REAL-WORLD DATASET CASE STUDY</h3>
          </div>
          
          <h4 className="text-2xl font-black text-[#111827] mb-1">Vänersborg Bridge SHM Dataset</h4>
          <p className="text-sm font-bold text-[#64748B] mb-6 uppercase tracking-widest">Structural Health Monitoring Data — Sweden</p>
          
          <p className="text-sm text-[#111827] leading-relaxed mb-6">
            The Vänersborg Bridge dataset contains real structural health monitoring measurements collected from a monitored railway bridge in Sweden. The dataset includes acceleration/vibration, strain, inclination and environmental measurements across multiple bridge-opening events. The monitoring campaign also contains measurements surrounding a verified structural fracture.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mb-6">
            <div className="flex items-center text-sm text-[#64748B]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] mr-2"></span>
              64 bridge-opening events
            </div>
            <div className="flex items-center text-sm text-[#64748B]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] mr-2"></span>
              Real sensor measurements
            </div>
            <div className="flex items-center text-sm text-[#64748B]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] mr-2"></span>
              Acceleration/vibration data
            </div>
            <div className="flex items-center text-sm text-[#64748B]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] mr-2"></span>
              Strain measurements
            </div>
            <div className="flex items-center text-sm text-[#64748B]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] mr-2"></span>
              Inclination measurements
            </div>
            <div className="flex items-center text-sm text-[#64748B]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] mr-2"></span>
              Environmental/weather measurements
            </div>
            <div className="flex items-center text-sm text-[#64748B]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626] mr-2"></span>
              Data surrounding a verified fracture
            </div>
            <div className="flex items-center text-sm text-[#64748B]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] mr-2"></span>
              200 Hz acceleration sampling
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-6 border-t border-[#E2E8F0]">
            <div className="mb-4 sm:mb-0">
              <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest block">DOI</span>
              <span className="text-sm font-bold text-[#111827]">10.5281/zenodo.8300495</span>
            </div>
            <a 
              href="https://zenodo.org/records/8300495" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-lg font-bold text-sm transition-colors shadow-sm"
            >
              VIEW DATASET
            </a>
          </div>

        </div>
      </div>

      <div className="bg-[#F5F7FA] border-t border-[#E2E8F0] p-6 md:p-8">
        <h4 className="text-[#111827] font-bold uppercase text-xs tracking-widest mb-4">How does real data help BridgeGuard AI?</h4>
        <p className="text-sm text-[#64748B] leading-relaxed mb-6">
          Real SHM data allows the project to test its signal-processing and machine-learning approach using measurements collected from an actual monitored bridge rather than relying only on simulated values.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white border border-[#E2E8F0] p-4 rounded-lg">
            <div className="text-[10px] font-bold text-[#2563EB] uppercase tracking-widest mb-1">Simulation</div>
            <div className="text-sm font-medium text-[#111827]">Demonstrates the dashboard and prototype logic.</div>
          </div>
          <div className="bg-white border border-[#E2E8F0] p-4 rounded-lg">
            <div className="text-[10px] font-bold text-[#2563EB] uppercase tracking-widest mb-1">Real dataset</div>
            <div className="text-sm font-medium text-[#111827]">Validates the data-processing and ML approach.</div>
          </div>
          <div className="bg-white border border-[#E2E8F0] p-4 rounded-lg">
            <div className="text-[10px] font-bold text-[#2563EB] uppercase tracking-widest mb-1">ESP32 + Sensors</div>
            <div className="text-sm font-medium text-[#111827]">Future live-data source for the physical prototype.</div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[#E2E8F0]">
          <h4 className="text-[#111827] font-bold uppercase text-xs tracking-widest mb-4">Real Dataset ML Pipeline Reference</h4>
          <div className="flex flex-wrap items-center text-[10px] font-bold text-[#64748B] uppercase tracking-widest">
            <span className="bg-white border border-[#E2E8F0] px-3 py-1.5 rounded m-1">Vänersborg SHM Dataset</span>
            <span className="m-1">→</span>
            <span className="bg-white border border-[#E2E8F0] px-3 py-1.5 rounded m-1">Raw sensor signals</span>
            <span className="m-1">→</span>
            <span className="bg-white border border-[#E2E8F0] px-3 py-1.5 rounded m-1">Signal windowing</span>
            <span className="m-1">→</span>
            <span className="bg-white border border-[#E2E8F0] px-3 py-1.5 rounded m-1">Feature extraction (RMS, Peak, StdDev, Freq)</span>
            <span className="m-1">→</span>
            <span className="bg-[#eff6ff] text-[#2563EB] border border-[#bfdbfe] px-3 py-1.5 rounded m-1">Random Forest Classifier</span>
            <span className="m-1">→</span>
            <span className="bg-white border border-[#E2E8F0] px-3 py-1.5 rounded m-1">Normal / Abnormal Behaviour</span>
            <span className="m-1">→</span>
            <span className="bg-white border border-[#E2E8F0] px-3 py-1.5 rounded m-1">Anomaly Detection</span>
          </div>
          <p className="text-xs text-[#64748B] mt-4 italic">
            BridgeGuard AI uses the Vänersborg dataset as a real-world reference for developing and evaluating its structural abnormal-behaviour detection pipeline.
          </p>
        </div>
      </div>
    </div>
  );
}
