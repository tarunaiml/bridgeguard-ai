"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Activity, BrainCircuit, Database, Sliders, BookOpen, Presentation } from 'lucide-react';
import clsx from 'clsx';

const navItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Live Monitoring', path: '/monitoring', icon: Activity },
  { name: 'AI Prediction', path: '/prediction', icon: BrainCircuit },
  { name: 'Sensor Data', path: '/data', icon: Database },
  { name: 'Simulation', path: '/simulation', icon: Sliders },
  { name: 'Methodology', path: '/methodology', icon: BookOpen },
  { name: 'Project Progress', path: '/progress', icon: Presentation },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#0B1120] border-r border-gray-800 hidden md:flex flex-col">
      <div className="h-16 flex items-center px-6 border-b border-gray-800">
        <BrainCircuit className="w-6 h-6 text-cyan-400 mr-2" />
        <span className="text-white font-bold tracking-wider">BRIDGEGUARD</span>
      </div>
      <nav className="flex-1 py-6 px-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.name}
              href={item.path}
              className={clsx(
                "flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors",
                isActive 
                  ? "bg-cyan-900/30 text-cyan-400 border border-cyan-800/50" 
                  : "text-gray-400 hover:bg-gray-800/50 hover:text-white"
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium text-sm">{item.name}</span>
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-gray-800">
        <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
          <p className="text-xs text-gray-500 mb-2">BridgeGuard AI is an academic proof-of-concept.</p>
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse mr-2"></div>
            <span className="text-xs font-semibold text-cyan-400">PROTOTYPE MODE</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
