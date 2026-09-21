"use client";

import { useSimulation } from "@/context/SimulationContext";
import { Search } from "lucide-react";
import { useState } from "react";
import clsx from 'clsx';

export default function DataPage() {
  const { history } = useSimulation();
  const [searchTerm, setSearchTerm] = useState("");

  const displayHistory = [...history].reverse();

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h2 className="text-3xl font-black text-white tracking-tighter mb-2">SENSOR DATA</h2>
        <p className="text-sm font-bold text-slate-400 tracking-widest uppercase mt-1">Raw simulated historical telemetry.</p>
      </div>

      <div className="bg-[#0D1422] border border-slate-800 rounded-2xl flex flex-col h-[70vh] shadow-sm">
        <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50 rounded-t-2xl">
          <div className="relative w-72">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <input 
              type="text" 
              placeholder="Filter by condition..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#070B14] border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-xs font-bold tracking-wide text-white focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>
          <div className="flex items-center text-[10px] font-bold tracking-widest text-slate-400 uppercase bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse mr-2"></div>
            Live updates active
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#070B14] text-slate-400 sticky top-0 uppercase tracking-widest text-[10px] font-bold z-10 border-b border-slate-800 shadow-sm">
              <tr>
                <th className="px-6 py-4">Timestamp</th>
                <th className="px-6 py-4">Score</th>
                <th className="px-6 py-4 text-right">Accel X</th>
                <th className="px-6 py-4 text-right">Accel Y</th>
                <th className="px-6 py-4 text-right">Accel Z</th>
                <th className="px-6 py-4 text-right">RMS</th>
                <th className="px-6 py-4 text-right">Tilt X/Y</th>
                <th className="px-6 py-4 text-right">Temp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {displayHistory.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-slate-500 text-xs font-medium tracking-wide">
                    Waiting for simulation data...
                  </td>
                </tr>
              ) : (
                displayHistory.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-3 text-slate-300 font-mono text-xs">{row.timestamp}</td>
                    <td className="px-6 py-3">
                      <span className={clsx(
                        "text-[10px] font-bold tracking-widest px-2 py-1 rounded border",
                        (row.score ?? 100) > 75 ? "bg-green-500/10 text-green-400 border-green-500/20" :
                        (row.score ?? 100) > 50 ? "bg-amber-500/10 text-amber-400 border-amber-500/20" :
                        (row.score ?? 100) > 30 ? "bg-orange-500/10 text-orange-400 border-orange-500/20" :
                        "bg-red-500/10 text-red-400 border-red-500/20"
                      )}>
                        {row.score !== undefined ? row.score : 'N/A'}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-right text-slate-400 font-mono text-xs">{row.accelX.toFixed(3)}</td>
                    <td className="px-6 py-3 text-right text-slate-400 font-mono text-xs">{row.accelY.toFixed(3)}</td>
                    <td className="px-6 py-3 text-right text-cyan-400 font-mono text-xs font-medium">{row.accelZ.toFixed(3)}</td>
                    <td className="px-6 py-3 text-right text-cyan-400 font-mono text-xs font-bold">{row.rms.toFixed(3)}</td>
                    <td className="px-6 py-3 text-right text-slate-400 font-mono text-xs">{row.tiltX.toFixed(1)} / {row.tiltY.toFixed(1)}</td>
                    <td className="px-6 py-3 text-right text-slate-400 font-mono text-xs">{row.temperature.toFixed(1)}°</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
