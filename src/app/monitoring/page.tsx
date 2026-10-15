import { VibrationChart } from "@/components/Charts/VibrationChart";
import { TiltMonitor } from "@/components/Simulation/TiltMonitor";
import { HealthTrend } from "@/components/Charts/HealthTrend";
import { HardwareStatus } from "@/components/Dashboard/HardwareStatus";
import { PageIntro } from "@/components/Layout/PageIntro";

export default function MonitoringPage() {
  return (
    <div className="mx-auto max-w-[1280px] space-y-6 pb-12">
      <PageIntro eyebrow="Monitoring" title="Telemetry workspace" description="Inspect the active feed, vibration trend, orientation, and the current connection state." />

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
