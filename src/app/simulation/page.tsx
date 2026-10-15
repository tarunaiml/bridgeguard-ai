import { SimulationControls } from "@/components/Simulation/SimulationControls";
import { TiltMonitor } from "@/components/Simulation/TiltMonitor";
import { PageIntro } from "@/components/Layout/PageIntro";

export default function SimulationPage() {
  return (
    <div className="mx-auto max-w-[1280px] space-y-6 pb-12">
      <PageIntro eyebrow="Assessment controls" title="Set the test condition" description="Use the simulator to change the prototype condition or enter a manual reading for a one-off assessment." />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <SimulationControls />
        </div>
        <div>
          <TiltMonitor />
        </div>
      </div>
    </div>
  );
}
