"use client";

import { useSimulation } from '@/context/SimulationContext';

export function TiltMonitor() {
  const { currentData } = useSimulation();

  if (!currentData) return null;

  // Max visual tilt clamped for effect
  const visualTiltX = Math.max(-20, Math.min(20, currentData.tiltX * 2));
  const visualTiltY = Math.max(-20, Math.min(20, currentData.tiltY * 2));

  return (
    <div className="bg-[#0D1422] border border-slate-800 rounded-2xl p-6 flex flex-col items-center shadow-sm">
      <div className="w-full flex justify-between items-center mb-6">
        <h3 className="text-white font-bold uppercase text-xs tracking-widest">Structural Tilt</h3>
        <span className="text-[9px] font-bold text-cyan-400 bg-cyan-900/30 px-2 py-1 rounded border border-cyan-800 tracking-wider">LIVE</span>
      </div>

      <div className="relative w-48 h-48 rounded-full border-2 border-slate-800 flex items-center justify-center bg-[#070B14] perspective-1000 shadow-inner">
        <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
          <div className="w-full h-px bg-cyan-500/30 absolute"></div>
          <div className="h-full w-px bg-cyan-500/30 absolute"></div>
          <div className="w-3/4 h-3/4 rounded-full border border-cyan-500/20"></div>
          <div className="w-1/2 h-1/2 rounded-full border border-cyan-500/20"></div>
        </div>

        <div 
          className="w-32 h-16 bg-slate-800 border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.2)] rounded-sm transition-transform duration-300 ease-out flex items-center justify-center relative"
          style={{
            transform: `rotateX(${-visualTiltY}deg) rotateY(${visualTiltX}deg)`,
            transformStyle: 'preserve-3d'
          }}
        >
          {/* Deck markings */}
          <div className="w-full h-px bg-slate-600 absolute top-1/2 -translate-y-1/2" style={{ transform: "translateZ(1px)" }}></div>
          <div className="text-[9px] font-bold text-slate-400 tracking-widest" style={{ transform: "translateZ(2px)" }}>BRIDGE DECK</div>
        </div>

        <div 
          className="absolute w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] transition-all duration-300 ease-out"
          style={{
            transform: `translate(${visualTiltX * 2}px, ${visualTiltY * 2}px)`
          }}
        ></div>
      </div>

      <div className="w-full mt-6 grid grid-cols-2 gap-4">
        <div className="bg-slate-900 rounded-lg p-3 border border-slate-800 text-center">
          <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">Pitch (Y)</div>
          <div className="text-sm font-black tracking-widest text-white">{currentData.tiltY > 0 ? '+' : ''}{currentData.tiltY.toFixed(2)}°</div>
        </div>
        <div className="bg-slate-900 rounded-lg p-3 border border-slate-800 text-center">
          <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">Roll (X)</div>
          <div className="text-sm font-black tracking-widest text-white">{currentData.tiltX > 0 ? '+' : ''}{currentData.tiltX.toFixed(2)}°</div>
        </div>
      </div>
    </div>
  );
}
