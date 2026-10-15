"use client";

import { Database, ExternalLink, ShieldCheck, AlertCircle, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export function DatasetCaseStudy() {
  const [activeTab, setActiveTab] = useState<"ponneri" | "audit" | "benchmarks">("ponneri");

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden shadow-sm flex flex-col space-y-6 p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E2E8F0] gap-3">
        <div className="flex items-center space-x-2">
          <Database className="w-5 h-5 text-[#2563EB]" />
          <h3 className="text-[#111827] font-bold uppercase text-xs tracking-widest">
            REAL DATASET AUDIT & PROVENANCE
          </h3>
        </div>
        
        {/* Navigation Tabs */}
        <div className="flex space-x-1.5 bg-slate-100 p-1 rounded-lg w-fit">
          <button
            onClick={() => setActiveTab("ponneri")}
            className={`px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider rounded-md transition ${
              activeTab === "ponneri"
                ? "bg-white text-blue-700 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Active: Ponneri Bridge (India)
          </button>
          <button
            onClick={() => setActiveTab("audit")}
            className={`px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider rounded-md transition ${
              activeTab === "audit"
                ? "bg-white text-blue-700 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Indian Road-Bridge Audit
          </button>
          <button
            onClick={() => setActiveTab("benchmarks")}
            className={`px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider rounded-md transition ${
              activeTab === "benchmarks"
                ? "bg-white text-blue-700 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Verified Benchmarks
          </button>
        </div>
      </div>

      {/* Tab 1: Active Verified Dataset - Ponneri Bridge */}
      {activeTab === "ponneri" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-3">
              <div className="flex items-center space-x-2">
                <span className="text-xl font-black text-slate-900">Ponneri Bridge Vibration Dataset</span>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full">
                  Real Raw Data Obtained
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">
                Ponneri, Tamil Nadu, India · Indian Institute of Technology Madras (IIT Madras)
              </p>
              <p className="text-xs text-slate-600 leading-relaxed pt-1">
                Captured during real-world operational monitoring of the Ponneri Bridge structure. 
                Data collection recorded continuous structural response as dynamic loading approached and passed over the span.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-2 text-xs">
              <div className="flex justify-between border-b border-slate-200 pb-1.5">
                <span className="text-slate-500">Sampling Rate:</span>
                <span className="font-mono font-bold text-slate-900">600 Hz</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-1.5">
                <span className="text-slate-500">Duration:</span>
                <span className="font-mono font-bold text-slate-900">53.3 seconds</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-1.5">
                <span className="text-slate-500">Total Observations:</span>
                <span className="font-mono font-bold text-slate-900">31,978 samples</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-1.5">
                <span className="text-slate-500">Accelerometer Channels:</span>
                <span className="font-mono font-bold text-slate-900">8 active axes</span>
              </div>
              <div className="flex justify-between pt-0.5">
                <span className="text-slate-500">Repository DOI:</span>
                <a
                  href="https://doi.org/10.17632/hh52mhtndg.2"
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-blue-600 hover:underline flex items-center gap-1 font-bold"
                >
                  10.17632/hh52mhtndg.2 <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-lg border border-emerald-200 bg-emerald-50/50 space-y-1">
              <span className="font-bold text-emerald-800 uppercase tracking-wider text-[10px]">Ambient Baseline Windows (w0 – w20)</span>
              <p className="text-slate-600">
                Structural response before passage: vibration RMS is stable (0.0002 to 0.0035 g). Used to calculate the healthy baseline mean and variance vector.
              </p>
            </div>
            <div className="p-4 rounded-lg border border-red-200 bg-red-50/50 space-y-1">
              <span className="font-bold text-red-800 uppercase tracking-wider text-[10px]">Dynamic Event Windows (w27 – w37)</span>
              <p className="text-slate-600">
                Peak passage over the instrumented span: vibration RMS spikes to 0.116 – 0.946 g (&gt;100x acceleration jump). Used as the verified operational anomaly state.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Indian Road-Bridge Investigation Audit */}
      {activeTab === "audit" && (
        <div className="space-y-4">
          <div className="text-xs text-slate-600 leading-relaxed border-l-4 border-blue-600 pl-3 py-1">
            <strong className="text-slate-900">Phase 2 Road-Bridge Audit Results:</strong> We conducted an exhaustive investigation for raw public vibration datasets from Indian road bridges. Here is the verified accessibility status of each investigated lead:
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            {/* Cauvery Bridge */}
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 space-y-2">
              <div className="flex items-center space-x-1.5 text-slate-900 font-bold">
                <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Cauvery Bridge (NIT Trichy)</span>
              </div>
              <p className="text-slate-500 text-[11px]">Tiruchirappalli, Tamil Nadu, India</p>
              <p className="text-slate-600 leading-relaxed">
                Published in <em>Structural Engineering International</em> (DOI: 10.1080/10168664.2025.2544271). Deployed triaxial accelerometers on a road bridge.
              </p>
              <div className="pt-2 border-t border-slate-200 text-[10px] font-bold text-amber-800">
                Status: Research paper verified; raw signal files are not publicly downloadable (available only via private author request).
              </div>
            </div>

            {/* Amaravathi Highway Bridge */}
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 space-y-2">
              <div className="flex items-center space-x-1.5 text-slate-900 font-bold">
                <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Amaravathi Highway Bridge (CSIR-SERC)</span>
              </div>
              <p className="text-slate-500 text-[11px]">Across Amaravathi River, Tamil Nadu, India</p>
              <p className="text-slate-600 leading-relaxed">
                Forced and ambient vibration testing by CSIR-SERC using electrodynamic shakers and 8 accelerometers (natural freq: 5.28 Hz).
              </p>
              <div className="pt-2 border-t border-slate-200 text-[10px] font-bold text-amber-800">
                Status: Web project summary verified; raw measurement files are not hosted for open-access download on CSIR portals.
              </div>
            </div>

            {/* CSIR-CRRI */}
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 space-y-2">
              <div className="flex items-center space-x-1.5 text-slate-900 font-bold">
                <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
                <span>CSIR-CRRI Road Bridge Division</span>
              </div>
              <p className="text-slate-500 text-[11px]">New Delhi / National Highways, India</p>
              <p className="text-slate-600 leading-relaxed">
                CSIR-Central Road Research Institute conducts dynamic testing of road bridges as sponsored consultancy for highway authorities.
              </p>
              <div className="pt-2 border-t border-slate-200 text-[10px] font-bold text-amber-800">
                Status: Proprietary / confidential consultancy testing. No public open repository of raw telemetry files exists.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Verified Road-Bridge Benchmarks */}
      {activeTab === "benchmarks" && (
        <div className="space-y-4 text-xs">
          <p className="text-slate-600 leading-relaxed">
            In accordance with Phase 2 guidelines, when Indian road-bridge raw files are restricted to private correspondence, we benchmark against verified open-access road-bridge repositories:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 space-y-2">
              <span className="font-bold text-slate-900 text-sm block">Route 345 Highway Bridge (USA)</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                Zenodo DOI: 10.5281/zenodo.13737790
              </span>
              <p className="text-slate-600 leading-relaxed">
                Structural response from a steel stringer road bridge prior to replacement. Monitored with dual-axis accelerometers and strain gauges under vehicle passes and static truck load before and after imposed mechanical cuts.
              </p>
            </div>

            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 space-y-2">
              <span className="font-bold text-slate-900 text-sm block">Vänersborg Bridge SHM (Sweden)</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                Zenodo DOI: 10.5281/zenodo.8300495
              </span>
              <p className="text-slate-600 leading-relaxed">
                Monitored steel bascule road bridge across 64 operational events. Features accelerometer, tilt, and strain measurements captured before, during, and after an authentic structural fatigue fracture.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
