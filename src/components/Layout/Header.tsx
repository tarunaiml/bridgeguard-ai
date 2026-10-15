"use client";

import { Activity, Database, LayoutDashboard, LineChart, SlidersHorizontal, Table2, BookOpen } from 'lucide-react';
import { useSimulation } from '@/context/SimulationContext';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Header() {
  const { mode } = useSimulation();
  const pathname = usePathname();
  const nav = [
    { href: '/', label: 'Overview', icon: LayoutDashboard },
    { href: '/monitoring', label: 'Monitoring', icon: LineChart },
    { href: '/simulation', label: 'Assess', icon: SlidersHorizontal },
    { href: '/data', label: 'Data', icon: Table2 },
    { href: '/methodology', label: 'Method', icon: BookOpen },
  ];
  
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-[1440px] flex-col px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
        
        {/* Left: Logo */}
        <div className="flex items-center space-x-3">
          <div className="rounded-lg bg-blue-50 p-2">
            <Activity className="w-5 h-5 text-[#2563EB]" />
          </div>
          <div>
            <h1 className="text-[#111827] font-black tracking-widest text-sm uppercase">BridgeGuard ML</h1>
            <p className="text-[10px] text-[#64748B] uppercase tracking-widest font-bold hidden sm:block">Explainable Machine Learning for Bridge Structural Health Monitoring</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="group relative flex flex-col items-end">
            <div className="flex items-center space-x-2 bg-white border border-[#E2E8F0] px-3 py-1.5 rounded-full shadow-sm cursor-help hover:bg-[#F5F7FA] transition-colors">
              <Database className="w-3.5 h-3.5 text-[#64748B]" />
              <span className="text-[9px] font-bold text-[#64748B] uppercase tracking-widest">DATA SOURCE</span>
              <span className="flex items-center text-[10px] font-black text-[#2563EB] uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-[#2563EB] mr-1.5"></span>
                {mode}
              </span>
            </div>
            
            {/* Tooltip */}
            <div className="absolute top-full right-0 mt-2 w-48 bg-[#111827] text-white text-[10px] font-medium p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 text-center leading-relaxed">
              Current dashboard values are {mode === 'SIMULATION' ? 'simulated' : 'manually inputted'} for demonstration.
        </div>
        </div>
        <nav className="-mx-4 flex gap-1 overflow-x-auto border-t border-slate-100 px-4 sm:mx-0 sm:border-0 sm:px-0 sm:absolute sm:left-1/2 sm:top-2 sm:-translate-x-1/2 sm:items-center sm:h-12" aria-label="Primary navigation">
          {nav.map(({ href, label, icon: Icon }) => {
            const active = href === '/' ? pathname === '/' : pathname.startsWith(href);
            return <Link key={href} href={href} className={clsx("inline-flex shrink-0 items-center gap-1.5 rounded-md px-3 py-2 text-xs font-semibold transition", active ? "bg-slate-100 text-blue-700" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900")}><Icon className="h-3.5 w-3.5" />{label}</Link>;
          })}
        </nav>
          </div>
        </div>

      </div>
    </header>
  );
}
