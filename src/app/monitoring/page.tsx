import { VibrationChart } from "@/components/Charts/VibrationChart";
import { TiltMonitor } from "@/components/Simulation/TiltMonitor";
import { HealthTrend } from "@/components/Charts/HealthTrend";
import { HardwareStatus } from "@/components/Dashboard/HardwareStatus";

export default function MonitoringPage() {
  return (
    <div className="space-y-8 pb-12">
      <div>
        <h2 className="text-3xl font-black text-white tracking-tighter mb-2">LIVE MONITORING</h2>
        <p className="text-sm font-bold text-slate-400 tracking-widest uppercase mt-1">Real-time sensor streams (Simulated Prototype Mode)</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <VibrationChart />
          <HealthTrend />
        </div>
        <div className="lg:col-span-1 space-y-6">
          <TiltMonitor />
          <HardwareStatus />
        </div>
      </div>
    </div>
  );
}
