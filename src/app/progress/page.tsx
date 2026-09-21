import { ProjectProgress } from "@/components/ProjectProgress";

export default function ProgressPage() {
  return (
    <div className="space-y-8 pb-12 max-w-4xl mx-auto">
      <div>
        <h2 className="text-3xl font-black text-white tracking-tighter mb-2">PROJECT STATUS</h2>
        <p className="text-sm font-bold text-slate-400 tracking-widest uppercase mt-1">BridgeGuard AI Development Roadmap.</p>
      </div>

      <ProjectProgress />

      <div className="bg-[#0D1422] border border-slate-800 rounded-2xl p-6 mt-6 shadow-sm">
        <h3 className="text-white font-bold uppercase text-xs tracking-widest mb-6 text-center">Hardware Integration Plan</h3>
        
        <div className="flex flex-col md:flex-row items-stretch justify-center space-y-4 md:space-y-0 md:space-x-8 mt-6">
          
          <div className="flex-1 bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-inner">
            <div className="text-[10px] font-bold text-cyan-500 uppercase tracking-widest mb-6 text-center">Current Phase</div>
            <div className="space-y-4 text-xs font-bold tracking-wider text-slate-300">
              <div className="p-3 bg-slate-800 rounded-lg text-center uppercase">Simulation Data Engine</div>
              <div className="text-center text-slate-600">↓</div>
              <div className="p-3 bg-slate-800 rounded-lg text-center uppercase">Prototype Scoring Logic</div>
              <div className="text-center text-slate-600">↓</div>
              <div className="p-3 border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 rounded-lg text-center uppercase">Web Dashboard</div>
            </div>
          </div>

          <div className="flex items-center justify-center text-slate-700">
            <span className="hidden md:block text-2xl">→</span>
          </div>

          <div className="flex-1 bg-cyan-500/5 border border-cyan-500/20 rounded-xl p-5 shadow-inner">
            <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest mb-6 text-center">Next Phase (Hardware)</div>
            <div className="space-y-3 text-xs font-bold tracking-wider text-slate-300">
              <div className="p-2.5 bg-slate-800 rounded-lg text-center uppercase">MPU6050 + DHT11</div>
              <div className="text-center text-slate-600">↓</div>
              <div className="p-2.5 bg-slate-800 rounded-lg text-center uppercase">ESP32 + Wi-Fi</div>
              <div className="text-center text-slate-600">↓</div>
              <div className="p-2.5 bg-slate-800 rounded-lg text-center uppercase">Real Sensor Stream</div>
              <div className="text-center text-slate-600">↓</div>
              <div className="p-2.5 bg-slate-800 rounded-lg text-center uppercase">Trained ML Model</div>
              <div className="text-center text-slate-600">↓</div>
              <div className="p-2.5 border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 rounded-lg text-center uppercase">Web Dashboard</div>
            </div>
          </div>

        </div>
        
        <div className="mt-8 text-center text-[10px] font-bold text-slate-500 uppercase tracking-widest">
          Hardware integration planned for next development phase.
        </div>
      </div>
    </div>
  );
}
