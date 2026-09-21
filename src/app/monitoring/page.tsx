import { VibrationChart } from "@/components/Charts/VibrationChart";
import { TiltMonitor } from "@/components/Simulation/TiltMonitor";
import { HealthTrend } from "@/components/Charts/HealthTrend";
import { SensorStatus } from "@/components/Dashboard/SensorStatus";

export default function MonitoringPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white tracking-wide">Live Monitoring</h2>
        <p className="text-sm text-gray-400 mt-1">Real-time sensor streams (Simulated Prototype Mode).</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <VibrationChart />
          <HealthTrend />
        </div>
        <div className="lg:col-span-1 space-y-6">
          <TiltMonitor />
          <SensorStatus />
        </div>
      </div>
    </div>
  );
}
