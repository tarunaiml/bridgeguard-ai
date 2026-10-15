"use client";

import { SensorInputs } from "@/components/Dashboard/SensorInputs";
import { VibrationChart } from "@/components/Charts/VibrationChart";
import { SimulationControls } from "@/components/Simulation/SimulationControls";
import { PredictionCard } from "@/components/Dashboard/PredictionCard";
import { ShapExplanation } from "@/components/Dashboard/ShapExplanation";
import { HealthTrend } from "@/components/Charts/HealthTrend";
import { SystemStatus } from "@/components/Dashboard/SystemStatus";
import { HealthScore } from "@/components/Dashboard/HealthScore";
import { KPIs } from "@/components/Dashboard/KPIs";
import { Overview } from "@/components/Dashboard/Overview";
import { PageIntro } from "@/components/Layout/PageIntro";

export default function Dashboard() {
  return (
    <div className="mx-auto max-w-[1280px] space-y-6 pb-12">
      <PageIntro eyebrow="BridgeGuard ML" title="Structural health overview" description="A focused view of the current prototype feed, condition assessment, and available ML evidence." />
      <div className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm leading-6 text-blue-900">This academic prototype uses simulation or user-entered values until the physical sensor pipeline is connected. It is not a certified bridge-safety system.</div>
      <Overview />
      <div className="grid gap-6 xl:grid-cols-[290px_1fr]">
        <HealthScore />
        <KPIs />
      </div>
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.55fr)_minmax(300px,.85fr)]">
        <VibrationChart />
        <SimulationControls />
      </div>
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(340px,.8fr)]">
        <HealthTrend />
        <PredictionCard />
      </div>
      <ShapExplanation />
      <SensorInputs />
      <SystemStatus />
      <div className="border-t border-slate-200 pt-6 text-center text-xs leading-5 text-slate-500">SHAP indicates model-feature contribution, not structural causality. Review data and methodology before drawing engineering conclusions.</div>

    </div>
  );
}
