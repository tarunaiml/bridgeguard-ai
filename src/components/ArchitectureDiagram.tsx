import { Cpu, Wifi, Database, BrainCircuit, Activity, LineChart, Server } from 'lucide-react';

export function ArchitectureDiagram() {
  return (
    <div className="bg-[#0D1422] border border-slate-800 rounded-2xl p-8 shadow-sm">
      <h3 className="text-white font-bold uppercase text-xs tracking-widest mb-10 text-center">System Pipeline Architecture</h3>
      
      <div className="flex flex-col lg:flex-row items-center justify-center space-y-6 lg:space-y-0 lg:space-x-4 max-w-6xl mx-auto">
        
        <div className="flex flex-col items-center">
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 w-40 flex flex-col items-center text-center shadow-lg relative">
            <div className="absolute -top-3 bg-slate-800 text-[9px] font-bold text-slate-300 px-2 py-0.5 rounded border border-slate-700 uppercase tracking-widest">Physical Layer</div>
            <Activity className="w-6 h-6 text-slate-400 mb-3 mt-2" />
            <span className="text-xs font-bold text-slate-200 tracking-wide uppercase">Miniature Bridge</span>
          </div>
        </div>

        <div className="hidden lg:flex items-center text-slate-600">→</div>
        <div className="lg:hidden h-6 w-px bg-slate-700"></div>

        <div className="flex flex-col items-center">
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 w-40 flex flex-col items-center text-center shadow-lg relative">
            <div className="absolute -top-3 bg-slate-800 text-[9px] font-bold text-slate-300 px-2 py-0.5 rounded border border-slate-700 uppercase tracking-widest">Sensing</div>
            <Server className="w-6 h-6 text-cyan-500 mb-3 mt-2" />
            <span className="text-xs font-bold text-slate-200 tracking-wide uppercase">MPU6050<br/>DHT11</span>
          </div>
        </div>

        <div className="hidden lg:flex items-center text-slate-600">→</div>
        <div className="lg:hidden h-6 w-px bg-slate-700"></div>

        <div className="flex flex-col items-center">
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 w-40 flex flex-col items-center text-center shadow-lg relative">
            <div className="absolute -top-3 bg-slate-800 text-[9px] font-bold text-slate-300 px-2 py-0.5 rounded border border-slate-700 uppercase tracking-widest">Edge Processing</div>
            <Cpu className="w-6 h-6 text-cyan-500 mb-3 mt-2" />
            <span className="text-xs font-bold text-slate-200 tracking-wide uppercase">ESP32</span>
          </div>
        </div>

        <div className="hidden lg:flex items-center text-slate-600">→</div>
        <div className="lg:hidden h-6 w-px bg-slate-700"></div>

        <div className="flex flex-col items-center">
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 w-40 flex flex-col items-center text-center shadow-lg relative">
            <div className="absolute -top-3 bg-slate-800 text-[9px] font-bold text-slate-300 px-2 py-0.5 rounded border border-slate-700 uppercase tracking-widest">Transmission</div>
            <Wifi className="w-6 h-6 text-cyan-500 mb-3 mt-2" />
            <span className="text-xs font-bold text-slate-200 tracking-wide uppercase">Wi-Fi / IoT</span>
          </div>
        </div>

        <div className="hidden lg:flex items-center text-slate-600">→</div>
        <div className="lg:hidden h-6 w-px bg-slate-700"></div>

        <div className="flex flex-col items-center border-l-2 border-dashed border-slate-700 pl-4 lg:pl-0 lg:border-l-0 lg:border-t-2 lg:pt-6 relative mt-4 lg:mt-0">
          <div className="absolute -left-[45px] top-1/2 -translate-y-1/2 -rotate-90 lg:rotate-0 lg:-top-6 lg:left-1/2 lg:-translate-x-1/2 text-[9px] font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap">Cloud / UI Layer</div>
          <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4 w-40 flex flex-col items-center text-center shadow-[0_0_15px_rgba(6,182,212,0.1)] relative">
            <Database className="w-6 h-6 text-cyan-400 mb-3 mt-2" />
            <span className="text-xs font-bold text-cyan-100 tracking-wide uppercase">Data<br/>Processing</span>
          </div>
        </div>

        <div className="hidden lg:flex items-center text-cyan-800">→</div>
        <div className="lg:hidden h-6 w-px bg-cyan-900"></div>

        <div className="flex flex-col items-center">
          <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4 w-40 flex flex-col items-center text-center shadow-[0_0_15px_rgba(6,182,212,0.1)] relative">
            <BrainCircuit className="w-6 h-6 text-cyan-400 mb-3 mt-2" />
            <span className="text-xs font-bold text-cyan-100 tracking-wide uppercase">Random Forest</span>
          </div>
        </div>

        <div className="hidden lg:flex items-center text-cyan-800">→</div>
        <div className="lg:hidden h-6 w-px bg-cyan-900"></div>

        <div className="flex flex-col items-center">
          <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4 w-40 flex flex-col items-center text-center shadow-[0_0_15px_rgba(6,182,212,0.1)] relative">
            <LineChart className="w-6 h-6 text-cyan-400 mb-3 mt-2" />
            <span className="text-xs font-bold text-cyan-100 tracking-wide uppercase">Health Score Dashboard</span>
          </div>
        </div>

      </div>
    </div>
  );
}
