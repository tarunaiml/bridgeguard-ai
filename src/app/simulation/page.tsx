import { SimulationControls } from "@/components/Simulation/SimulationControls";
import { TiltMonitor } from "@/components/Simulation/TiltMonitor";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";

export default function SimulationPage() {
  return (
    <div className="space-y-8 pb-12">
      <div>
        <h2 className="text-3xl font-black text-white tracking-tighter mb-2">SIMULATION ENGINE</h2>
        <p className="text-sm font-bold text-slate-400 tracking-widest uppercase mt-1">Control the structural state of the prototype bridge model.</p>
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
