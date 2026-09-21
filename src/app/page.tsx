"use client";

import { HeroStatus } from "@/components/Dashboard/HeroStatus";
import { SensorInputs } from "@/components/Dashboard/SensorInputs";
import { VibrationChart } from "@/components/Charts/VibrationChart";
import { SimulationControls } from "@/components/Simulation/SimulationControls";
import { PredictionCard } from "@/components/Dashboard/PredictionCard";
import { AnomalyMonitor } from "@/components/Dashboard/AnomalyMonitor";
import { HealthTrend } from "@/components/Charts/HealthTrend";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { ProjectProgress } from "@/components/ProjectProgress";
import { DatasetPanel } from "@/components/Dashboard/DatasetPanel";

export default function Dashboard() {
  return (
    <div className="pb-12 max-w-[1000px] mx-auto">
      
      {/* Title */}
      <div className="mb-8 mt-4 text-center md:text-left">
        <h2 className="text-3xl font-black text-[#111827] tracking-tighter mb-2">DASHBOARD</h2>
        <p className="text-sm font-bold text-[#64748B] tracking-widest uppercase mt-1">Prototype System Overview</p>
      </div>

      {/* Health Score + 4 Key Metrics */}
      <HeroStatus />

      {/* Sensor Input / Manual Input */}
      <SensorInputs />

      {/* Vibration Chart */}
      <VibrationChart />

      {/* Bridge Condition Simulator */}
      <SimulationControls />

      {/* Dataset Panel */}
      <DatasetPanel />

      {/* AI Prediction + Anomaly + Recommendation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <PredictionCard />
        <AnomalyMonitor />
      </div>

      {/* Health Trend */}
      <HealthTrend />

      {/* System Pipeline */}
      <ArchitectureDiagram />

      {/* Project Progress */}
      <ProjectProgress />

      {/* Disclaimer */}
      <div className="mt-16 pt-8 border-t border-[#E2E8F0] text-center">
        <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest leading-relaxed">
          BridgeGuard AI is an academic proof-of-concept. The health score is a project-specific analytical metric and is not a standardized structural safety rating. Real-world bridge assessment requires validated engineering models, calibrated sensors, environmental compensation and qualified structural engineers.
        </p>
      </div>

    </div>
  );
}
