"use client";

import { HeroStatus } from "@/components/Dashboard/HeroStatus";
import { HardwareStatus } from "@/components/Dashboard/HardwareStatus";
import { VibrationChart } from "@/components/Charts/VibrationChart";
import { SimulationControls } from "@/components/Simulation/SimulationControls";
import { PredictionCard } from "@/components/Dashboard/PredictionCard";
import { AnomalyMonitor } from "@/components/Dashboard/AnomalyMonitor";
import { HealthTrend } from "@/components/Charts/HealthTrend";
import { FeatureImportance } from "@/components/Charts/FeatureImportance";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { ProjectProgress } from "@/components/ProjectProgress";

export default function Dashboard() {
  return (
    <div className="space-y-8 pb-12">
      
      {/* Title & Status */}
      <div className="mb-8">
        <h2 className="text-3xl font-black text-white tracking-tighter mb-2">BRIDGEGUARD AI</h2>
        <div className="flex items-center space-x-3">
          <span className="text-sm font-bold text-slate-400 tracking-widest uppercase">AI-Powered Structural Health Monitoring</span>
          <span className="px-2 py-0.5 rounded border border-slate-700 bg-slate-800 text-[10px] font-bold tracking-widest uppercase text-slate-300">Prototype Mode</span>
        </div>
      </div>

      {/* Hero Area: Health Score + KPIs */}
      <HeroStatus />

      {/* System Status & Vibration */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <HardwareStatus />
        </div>
        <div className="lg:col-span-2">
          <VibrationChart />
        </div>
      </div>

      {/* Simulator Control */}
      <div className="mt-8">
        <SimulationControls />
      </div>

      {/* AI Prediction & Anomaly */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <PredictionCard />
        <AnomalyMonitor />
      </div>

      {/* Charts & Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <HealthTrend />
        <FeatureImportance />
      </div>

      {/* Architecture */}
      <div className="mt-12">
        <ArchitectureDiagram />
      </div>

      {/* Progress */}
      <div className="mt-8">
        <ProjectProgress />
      </div>

      {/* Disclaimer */}
      <div className="mt-16 pt-8 border-t border-slate-800 text-center">
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
          BridgeGuard AI is an academic proof-of-concept.
          <br/>
          The system is not intended for real-world bridge safety certification or structural engineering decisions.
        </p>
      </div>

    </div>
  );
}
