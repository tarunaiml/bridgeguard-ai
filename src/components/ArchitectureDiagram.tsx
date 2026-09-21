import { Cpu, Wifi, Database, BrainCircuit, Activity, ActivitySquare } from 'lucide-react';

export function ArchitectureDiagram() {
  return (
    <div className="bg-[#0B1120] border border-gray-800 rounded-xl p-6">
      <h3 className="text-white font-medium uppercase text-sm tracking-wider mb-8 text-center">System Architecture</h3>
      
      <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4 max-w-4xl mx-auto">
        
        {/* Hardware Layer */}
        <div className="flex flex-col items-center">
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 w-32 flex flex-col items-center text-center">
            <ActivitySquare className="w-8 h-8 text-cyan-400 mb-2" />
            <span className="text-xs font-medium text-gray-300">MPU6050<br/>DHT11</span>
          </div>
          <div className="h-6 w-px bg-gray-600 my-1 md:hidden"></div>
          <div className="text-[10px] text-gray-500 uppercase mt-2 hidden md:block">Sensors</div>
        </div>

        <div className="hidden md:flex items-center text-gray-600">→</div>

        <div className="flex flex-col items-center">
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 w-32 flex flex-col items-center text-center">
            <Cpu className="w-8 h-8 text-cyan-400 mb-2" />
            <span className="text-xs font-medium text-gray-300">ESP32<br/>Microcontroller</span>
          </div>
          <div className="h-6 w-px bg-gray-600 my-1 md:hidden"></div>
          <div className="text-[10px] text-gray-500 uppercase mt-2 hidden md:block">Edge Node</div>
        </div>

        <div className="hidden md:flex items-center text-gray-600">→</div>

        <div className="flex flex-col items-center">
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 w-32 flex flex-col items-center text-center">
            <Wifi className="w-8 h-8 text-cyan-400 mb-2" />
            <span className="text-xs font-medium text-gray-300">IoT / Wi-Fi<br/>Gateway</span>
          </div>
          <div className="h-6 w-px bg-gray-600 my-1 md:hidden"></div>
          <div className="text-[10px] text-gray-500 uppercase mt-2 hidden md:block">Network</div>
        </div>

        <div className="hidden md:flex items-center text-gray-600">→</div>

        {/* Software Layer */}
        <div className="flex flex-col items-center">
          <div className="bg-cyan-900/20 border border-cyan-800/50 rounded-lg p-4 w-32 flex flex-col items-center text-center shadow-[0_0_15px_rgba(6,182,212,0.1)]">
            <Database className="w-8 h-8 text-cyan-400 mb-2" />
            <span className="text-xs font-medium text-gray-300">Feature<br/>Extraction</span>
          </div>
          <div className="h-6 w-px bg-gray-600 my-1 md:hidden"></div>
          <div className="text-[10px] text-gray-500 uppercase mt-2 hidden md:block">Data Pipeline</div>
        </div>

        <div className="hidden md:flex items-center text-gray-600">→</div>

        <div className="flex flex-col items-center">
          <div className="bg-cyan-900/20 border border-cyan-800/50 rounded-lg p-4 w-32 flex flex-col items-center text-center shadow-[0_0_15px_rgba(6,182,212,0.1)]">
            <BrainCircuit className="w-8 h-8 text-cyan-400 mb-2" />
            <span className="text-xs font-medium text-gray-300">Random Forest<br/>Model</span>
          </div>
          <div className="h-6 w-px bg-gray-600 my-1 md:hidden"></div>
          <div className="text-[10px] text-gray-500 uppercase mt-2 hidden md:block">AI Engine</div>
        </div>

        <div className="hidden md:flex items-center text-gray-600">→</div>

        <div className="flex flex-col items-center">
          <div className="bg-cyan-900/20 border border-cyan-800/50 rounded-lg p-4 w-32 flex flex-col items-center text-center shadow-[0_0_15px_rgba(6,182,212,0.1)]">
            <Activity className="w-8 h-8 text-cyan-400 mb-2" />
            <span className="text-xs font-medium text-gray-300">Health Score<br/>Dashboard</span>
          </div>
          <div className="text-[10px] text-gray-500 uppercase mt-2 hidden md:block">User Interface</div>
        </div>

      </div>
    </div>
  );
}
