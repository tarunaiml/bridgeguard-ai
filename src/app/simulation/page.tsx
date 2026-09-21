import { SimulationControls } from "@/components/Simulation/SimulationControls";
import { TiltMonitor } from "@/components/Simulation/TiltMonitor";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";

export default function SimulationPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white tracking-wide">Simulation Engine</h2>
        <p className="text-sm text-gray-400 mt-1">Control the structural state of the prototype bridge model.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <SimulationControls />
        </div>
        <div>
          <TiltMonitor />
        </div>
      </div>
      
      <div className="mt-8">
        <ArchitectureDiagram />
      </div>
    </div>
  );
}
