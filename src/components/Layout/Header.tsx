"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSimulation } from '@/context/SimulationContext';
import { BrainCircuit, Menu, X, Activity } from 'lucide-react';
import clsx from 'clsx';

const navItems = [
  { name: 'Dashboard', path: '/' },
  { name: 'Monitoring', path: '/monitoring' },
  { name: 'AI Prediction', path: '/prediction' },
  { name: 'Simulation', path: '/simulation' },
  { name: 'Methodology', path: '/methodology' },
];

export function Header() {
  const { currentData } = useSimulation();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="bg-[#0D1422] border-b border-slate-800 z-50 sticky top-0 shadow-lg">
      <div className="max-w-[1600px] mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        
        {/* Left: Logo & Title */}
        <div className="flex items-center space-x-3">
          <div className="bg-cyan-500/10 p-2 rounded-lg border border-cyan-500/20">
            <BrainCircuit className="w-5 h-5 text-cyan-400" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-white font-bold tracking-widest text-sm">BRIDGEGUARD AI</h1>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest">Structural Health Monitoring</p>
          </div>
        </div>

        {/* Center: Badges */}
        <div className="hidden lg:flex items-center space-x-4 bg-[#070B14] px-4 py-1.5 rounded-full border border-slate-800">
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse mr-2"></div>
            <span className="text-[10px] font-bold text-cyan-400 tracking-wider">PROTOTYPE MODE</span>
          </div>
          <div className="w-px h-3 bg-slate-700"></div>
          <span className="text-[10px] font-bold text-amber-500 tracking-wider">SIMULATED DATA</span>
          <div className="w-px h-3 bg-slate-700"></div>
          <span className="text-[10px] text-slate-400 tracking-wider font-mono">
            UPDATED: {currentData?.timestamp || '--:--:--'}
          </span>
        </div>

        {/* Right: Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className={clsx(
                "px-3 py-2 rounded-md text-xs font-semibold tracking-wide transition-colors",
                pathname === item.path
                  ? "bg-cyan-500/10 text-cyan-400"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-slate-400 hover:text-white p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-800 bg-[#0D1422] p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              onClick={() => setMobileOpen(false)}
              className={clsx(
                "block px-4 py-3 rounded-md text-sm font-semibold tracking-wide transition-colors",
                pathname === item.path
                  ? "bg-cyan-500/10 text-cyan-400"
                  : "text-slate-400 hover:text-white"
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
