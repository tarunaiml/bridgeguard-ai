import { ProjectProgress } from "@/components/ProjectProgress";

export default function ProgressPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold text-white tracking-wide">Project Status</h2>
        <p className="text-sm text-gray-400 mt-1">BridgeGuard AI Development Roadmap.</p>
      </div>

      <ProjectProgress />

      <div className="bg-[#0B1120] border border-gray-800 rounded-xl p-6 mt-6">
        <h3 className="text-white font-medium uppercase text-sm tracking-wider mb-4">Hardware Integration Plan</h3>
        
        <div className="flex flex-col md:flex-row items-stretch justify-center space-y-4 md:space-y-0 md:space-x-8 mt-6">
          
          <div className="flex-1 bg-gray-900/50 border border-gray-800 rounded-lg p-5">
            <div className="text-xs font-bold text-cyan-500 uppercase tracking-wider mb-4">Current Phase</div>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="p-2 bg-gray-800 rounded text-center">Simulation Data Engine</div>
              <div className="text-center text-gray-500">↓</div>
              <div className="p-2 bg-gray-800 rounded text-center">Prototype Scoring Logic</div>
              <div className="text-center text-gray-500">↓</div>
              <div className="p-2 border border-cyan-800 bg-cyan-900/20 text-cyan-400 rounded text-center">Web Dashboard</div>
            </div>
          </div>

          <div className="flex items-center justify-center text-gray-600">
            <span className="hidden md:block text-2xl">→</span>
          </div>

          <div className="flex-1 bg-cyan-900/10 border border-cyan-800/30 rounded-lg p-5">
            <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-4">Next Phase (Hardware)</div>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="p-2 bg-gray-800 rounded text-center">MPU6050 + DHT11</div>
              <div className="text-center text-gray-500">↓</div>
              <div className="p-2 bg-gray-800 rounded text-center">ESP32 + Wi-Fi</div>
              <div className="text-center text-gray-500">↓</div>
              <div className="p-2 bg-gray-800 rounded text-center">Real Sensor Stream</div>
              <div className="text-center text-gray-500">↓</div>
              <div className="p-2 bg-gray-800 rounded text-center">Trained ML Model</div>
              <div className="text-center text-gray-500">↓</div>
              <div className="p-2 border border-cyan-800 bg-cyan-900/20 text-cyan-400 rounded text-center">Web Dashboard</div>
            </div>
          </div>

        </div>
        
        <div className="mt-8 text-center text-sm text-gray-400 italic">
          Hardware integration planned for next development phase.
        </div>
      </div>
    </div>
  );
}
