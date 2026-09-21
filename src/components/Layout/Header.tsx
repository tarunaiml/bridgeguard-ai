"use client";

import { useSimulation } from '@/context/SimulationContext';
import { Play, Pause, RotateCcw, Menu } from 'lucide-react';

export function Header() {
  const { isRunning, setIsRunning } = useSimulation();

  return (
    <header className="h-16 bg-[#0B1120] border-b border-gray-800 flex items-center justify-between px-6 z-10 sticky top-0">
      <div className="flex items-center">
        <button className="md:hidden mr-4 text-gray-400 hover:text-white">
          <Menu className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-white font-semibold text-lg hidden sm:block">Structural Health Monitoring & AI Prediction</h1>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="hidden sm:flex items-center px-3 py-1 bg-yellow-900/30 border border-yellow-700/50 rounded-full">
          <span className="text-yellow-500 text-xs font-medium uppercase tracking-wider">Simulated Data</span>
        </div>

        <div className="flex items-center space-x-2 border-l border-gray-800 pl-4">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors text-white"
            title={isRunning ? "Pause Simulation" : "Start Simulation"}
          >
            {isRunning ? <Pause className="w-5 h-5 text-yellow-400" /> : <Play className="w-5 h-5 text-green-400" />}
          </button>
        </div>
      </div>
    </header>
  );
}
