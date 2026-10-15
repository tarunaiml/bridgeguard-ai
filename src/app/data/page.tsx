"use client";

import { useSimulation } from "@/context/SimulationContext";
import { Search } from "lucide-react";
import { useState } from "react";
import clsx from 'clsx';
import { PageIntro } from "@/components/Layout/PageIntro";

export default function DataPage() {
  const { history } = useSimulation();
  const [searchTerm, setSearchTerm] = useState("");

  const displayHistory = [...history].reverse();

  return (
    <div className="mx-auto max-w-[1280px] space-y-6 pb-12">
      <PageIntro eyebrow="Data" title="Telemetry history" description="Filter the readings gathered during this browser session. This table reflects the active simulated or manual feed." />

      <div className="flex h-[70vh] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col items-start justify-between gap-3 border-b border-slate-200 bg-slate-50 p-5 sm:flex-row sm:items-center">
          <div className="relative w-72">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <input 
              type="text" 
              placeholder="Filter by condition..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-xs font-medium text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>
          <div className="flex items-center rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-blue-700"><div className="mr-2 h-2 w-2 animate-pulse rounded-full bg-blue-500"></div>
            Live updates active
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          <table className="w-full text-left text-sm">
            <thead className="sticky top-0 z-10 border-b border-slate-200 bg-slate-50 text-[10px] font-bold uppercase tracking-widest text-slate-500 shadow-sm">
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
            <tbody className="divide-y divide-slate-100">
              {displayHistory.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-slate-500 text-xs font-medium tracking-wide">
                    Waiting for simulation data...
                  </td>
                </tr>
              ) : (
                displayHistory.map((row, i) => (
                  <tr key={i} className="transition-colors hover:bg-slate-50"><td className="px-6 py-3 font-mono text-xs text-slate-700">{row.timestamp}</td>
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
                    <td className="px-6 py-3 text-right font-mono text-xs text-slate-600">{row.accelX.toFixed(3)}</td><td className="px-6 py-3 text-right font-mono text-xs text-slate-600">{row.accelY.toFixed(3)}</td><td className="px-6 py-3 text-right font-mono text-xs font-medium text-blue-700">{row.accelZ.toFixed(3)}</td><td className="px-6 py-3 text-right font-mono text-xs font-bold text-blue-700">{row.rms.toFixed(3)}</td><td className="px-6 py-3 text-right font-mono text-xs text-slate-600">{row.tiltX.toFixed(1)} / {row.tiltY.toFixed(1)}</td><td className="px-6 py-3 text-right font-mono text-xs text-slate-600">{row.temperature.toFixed(1)}°</td>
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
