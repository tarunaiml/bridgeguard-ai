"use client";

import { HeroStatus } from "@/components/Dashboard/HeroStatus";
import { SensorInputs } from "@/components/Dashboard/SensorInputs";
import { VibrationChart } from "@/components/Charts/VibrationChart";
import { SimulationControls } from "@/components/Simulation/SimulationControls";
import { PredictionCard } from "@/components/Dashboard/PredictionCard";
import { AnomalyMonitor } from "@/components/Dashboard/AnomalyMonitor";
import { ShapExplanation } from "@/components/Dashboard/ShapExplanation";
import { HealthTrend } from "@/components/Charts/HealthTrend";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { ProjectProgress } from "@/components/ProjectProgress";
import { DatasetCaseStudy } from "@/components/Dashboard/DatasetCaseStudy";

export default function Dashboard() {
  return (
    <div className="pb-16 pt-8 max-w-[1000px] mx-auto px-4 md:px-0 flex flex-col space-y-6">
      
      {/* Title */}
      <div className="mb-2 text-center md:text-left">
        <h2 className="text-3xl font-black text-[#111827] tracking-tighter mb-1">DASHBOARD</h2>
        <div className="inline-block bg-[#eff6ff] border border-[#bfdbfe] text-[#1D4ED8] text-[11px] font-medium px-4 py-2.5 rounded-lg leading-relaxed max-w-2xl text-left mt-3">
          <strong className="uppercase tracking-widest block mb-1">Data Source Note</strong>
          The current live dashboard uses simulated sensor values for demonstration until physical sensors and the real ML pipeline are connected. Do not interpret these as real bridge measurements.
        </div>
      </div>

      <HeroStatus />

      <SensorInputs />

      <div className="grid grid-cols-1 gap-6">
        <VibrationChart />
        <SimulationControls />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PredictionCard />
        <AnomalyMonitor />
        <ShapExplanation />
      </div>

      <HealthTrend />
      
      <DatasetCaseStudy />

      <ArchitectureDiagram />

      <ProjectProgress />

      {/* Disclaimer */}
      <div className="mt-12 pt-8 border-t border-[#E2E8F0] text-center">
        <h5 className="text-[10px] font-black text-[#111827] uppercase tracking-widest mb-2">ACADEMIC PROTOTYPE</h5>
        <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest leading-relaxed max-w-3xl mx-auto">
          BridgeGuard ML is an academic proof-of-concept and is not a certified structural safety system. SHAP explains the contribution of model features to a prediction. It does not establish structural causality or certify bridge safety.
        </p>
      </div>

    </div>
  );
}
