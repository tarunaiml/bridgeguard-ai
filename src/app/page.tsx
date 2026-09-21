"use client";

import { KPIs } from "@/components/Dashboard/KPIs";
import { HealthScore } from "@/components/Dashboard/HealthScore";
import { PredictionCard } from "@/components/Dashboard/PredictionCard";
import { SensorStatus } from "@/components/Dashboard/SensorStatus";
import { VibrationChart } from "@/components/Charts/VibrationChart";
import { SimulationControls } from "@/components/Simulation/SimulationControls";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-wide">Dashboard Overview</h2>
          <p className="text-sm text-gray-400 mt-1">Real-time simulated monitoring and AI analysis.</p>
        </div>
      </div>

      <KPIs />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <HealthScore />
          <PredictionCard />
        </div>
        <div className="lg:col-span-2 space-y-6">
          <VibrationChart />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <SensorStatus />
        </div>
        <div className="lg:col-span-2">
          <SimulationControls />
        </div>
      </div>
    </div>
  );
}
