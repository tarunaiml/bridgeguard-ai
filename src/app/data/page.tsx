"use client";

import { useSimulation } from "@/context/SimulationContext";
import { Search } from "lucide-react";
import { useState } from "react";

export default function DataPage() {
  const { history } = useSimulation();
  const [searchTerm, setSearchTerm] = useState("");

  // Create a reversed copy for display
  const displayHistory = [...history].reverse();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white tracking-wide">Sensor Data</h2>
        <p className="text-sm text-gray-400 mt-1">Raw simulated historical telemetry.</p>
      </div>

      <div className="bg-[#0B1120] border border-gray-800 rounded-xl flex flex-col h-[70vh]">
        <div className="p-4 border-b border-gray-800 flex justify-between items-center">
          <div className="relative w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input 
              type="text" 
              placeholder="Filter by condition..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
            />
          </div>
          <div className="flex items-center text-xs text-gray-500">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse mr-2"></div>
            Live updates active
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-900/50 text-gray-400 sticky top-0 uppercase tracking-wider text-xs">
              <tr>
                <th className="px-6 py-3 font-medium">Timestamp</th>
                <th className="px-6 py-3 font-medium">Condition (Score)</th>
                <th className="px-6 py-3 font-medium text-right">Accel X</th>
                <th className="px-6 py-3 font-medium text-right">Accel Y</th>
                <th className="px-6 py-3 font-medium text-right">Accel Z</th>
                <th className="px-6 py-3 font-medium text-right">RMS</th>
                <th className="px-6 py-3 font-medium text-right">Tilt X/Y</th>
                <th className="px-6 py-3 font-medium text-right">Temp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {displayHistory.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                    Waiting for simulation data...
                  </td>
                </tr>
              ) : (
                displayHistory.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-800/30 transition-colors">
                    <td className="px-6 py-3 text-gray-300 font-mono text-xs">{row.timestamp}</td>
                    <td className="px-6 py-3">
                      <span className="text-xs bg-gray-800 px-2 py-1 rounded text-gray-300">
                        {row.score !== undefined ? `SCORE: ${row.score}` : 'SIMULATED'}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-right text-gray-400 font-mono">{row.accelX.toFixed(3)}</td>
                    <td className="px-6 py-3 text-right text-gray-400 font-mono">{row.accelY.toFixed(3)}</td>
                    <td className="px-6 py-3 text-right text-green-400 font-mono">{row.accelZ.toFixed(3)}</td>
                    <td className="px-6 py-3 text-right text-cyan-400 font-mono font-medium">{row.rms.toFixed(3)}</td>
                    <td className="px-6 py-3 text-right text-gray-400 font-mono">{row.tiltX.toFixed(1)} / {row.tiltY.toFixed(1)}</td>
                    <td className="px-6 py-3 text-right text-gray-400 font-mono">{row.temperature.toFixed(1)}°</td>
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
