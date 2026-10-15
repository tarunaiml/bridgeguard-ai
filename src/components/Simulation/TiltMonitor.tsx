"use client";

import { useSimulation } from '@/context/SimulationContext';

export function TiltMonitor() {
  const { currentData } = useSimulation();

  if (!currentData) return null;

  // Max visual tilt clamped for effect
  const visualTiltX = Math.max(-20, Math.min(20, currentData.tiltX * 2));
  const visualTiltY = Math.max(-20, Math.min(20, currentData.tiltY * 2));

  return (
    <div className="flex flex-col items-center rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="w-full flex justify-between items-center mb-6">
        <h3 className="text-sm font-semibold text-slate-950">Structural tilt</h3>
        <span className="rounded border border-blue-200 bg-blue-50 px-2 py-1 text-[9px] font-bold tracking-wider text-blue-700">LIVE</span>
      </div>

      <div className="relative flex h-48 w-48 items-center justify-center rounded-full border-2 border-slate-200 bg-slate-50 perspective-1000 shadow-inner">
        <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
          <div className="absolute h-px w-full bg-blue-300"></div><div className="absolute h-full w-px bg-blue-300"></div><div className="h-3/4 w-3/4 rounded-full border border-blue-200"></div><div className="h-1/2 w-1/2 rounded-full border border-blue-200"></div>
        </div>

        <div 
          className="relative flex h-16 w-32 items-center justify-center rounded-sm border border-blue-300 bg-slate-800 shadow-[0_0_15px_rgba(37,99,235,0.15)] transition-transform duration-300 ease-out"
          style={{
            transform: `rotateX(${-visualTiltY}deg) rotateY(${visualTiltX}deg)`,
            transformStyle: 'preserve-3d'
          }}
        >
          {/* Deck markings */}
          <div className="absolute top-1/2 h-px w-full -translate-y-1/2 bg-slate-600" style={{ transform: "translateZ(1px)" }}></div><div className="text-[9px] font-bold tracking-widest text-slate-300" style={{ transform: "translateZ(2px)" }}>BRIDGE DECK</div>
        </div>

        <div 
          className="absolute h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6] transition-all duration-300 ease-out"
          style={{
            transform: `translate(${visualTiltX * 2}px, ${visualTiltY * 2}px)`
          }}
        ></div>
      </div>

      <div className="w-full mt-6 grid grid-cols-2 gap-4">
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-center"><div className="mb-1 text-[9px] font-bold uppercase tracking-widest text-slate-500">Pitch (Y)</div><div className="text-sm font-semibold tracking-wide text-slate-950">{currentData.tiltY > 0 ? '+' : ''}{currentData.tiltY.toFixed(2)}°</div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-center"><div className="mb-1 text-[9px] font-bold uppercase tracking-widest text-slate-500">Roll (X)</div><div className="text-sm font-semibold tracking-wide text-slate-950">{currentData.tiltX > 0 ? '+' : ''}{currentData.tiltX.toFixed(2)}°</div>
        </div>
      </div>
    </div>
  );
}
