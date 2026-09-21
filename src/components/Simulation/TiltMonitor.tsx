"use client";

import { useSimulation } from '@/context/SimulationContext';

export function TiltMonitor() {
  const { currentData } = useSimulation();

  if (!currentData) return null;

  // Max visual tilt clamped for effect
  const visualTiltX = Math.max(-20, Math.min(20, currentData.tiltX * 2));
  const visualTiltY = Math.max(-20, Math.min(20, currentData.tiltY * 2));

  return (
    <div className="bg-[#0B1120] border border-gray-800 rounded-xl p-5 flex flex-col items-center">
      <div className="w-full flex justify-between items-center mb-6">
        <h3 className="text-white font-medium uppercase text-sm tracking-wider">Structural Tilt</h3>
        <span className="text-xs text-gray-500">Live</span>
      </div>

      <div className="relative w-48 h-48 rounded-full border-2 border-gray-800 flex items-center justify-center bg-gray-900/50 perspective-1000">
        <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
          <div className="w-full h-px bg-cyan-500/50 absolute"></div>
          <div className="h-full w-px bg-cyan-500/50 absolute"></div>
          <div className="w-3/4 h-3/4 rounded-full border border-cyan-500/30"></div>
          <div className="w-1/2 h-1/2 rounded-full border border-cyan-500/30"></div>
        </div>

        <div 
          className="w-32 h-16 bg-gray-800 border-2 border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.3)] rounded-sm transition-transform duration-300 ease-out flex items-center justify-center relative"
          style={{
            transform: `rotateX(${-visualTiltY}deg) rotateY(${visualTiltX}deg)`,
            transformStyle: 'preserve-3d'
          }}
        >
          {/* Deck markings */}
          <div className="w-full h-px bg-gray-600 absolute top-1/2 -translate-y-1/2" style={{ transform: "translateZ(1px)" }}></div>
          <div className="text-[10px] text-gray-400 font-mono" style={{ transform: "translateZ(2px)" }}>BRIDGE DECK</div>
        </div>

        <div 
          className="absolute w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] transition-all duration-300 ease-out"
          style={{
            transform: `translate(${visualTiltX * 2}px, ${visualTiltY * 2}px)`
          }}
        ></div>
      </div>

      <div className="w-full mt-6 grid grid-cols-2 gap-4">
        <div className="bg-gray-900 rounded p-2 text-center">
          <div className="text-[10px] text-gray-500 uppercase">Pitch (Y)</div>
          <div className="text-sm font-mono text-cyan-400">{currentData.tiltY > 0 ? '+' : ''}{currentData.tiltY.toFixed(2)}°</div>
        </div>
        <div className="bg-gray-900 rounded p-2 text-center">
          <div className="text-[10px] text-gray-500 uppercase">Roll (X)</div>
          <div className="text-sm font-mono text-cyan-400">{currentData.tiltX > 0 ? '+' : ''}{currentData.tiltX.toFixed(2)}°</div>
        </div>
      </div>
    </div>
  );
}
