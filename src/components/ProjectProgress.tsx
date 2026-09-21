import { CheckCircle2, Circle, CircleDashed } from 'lucide-react';

export function ProjectProgress() {
  return (
    <div className="bg-[#0D1422] border border-slate-800 rounded-2xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-white font-bold uppercase text-xs tracking-widest">Project Development</h3>
        <div className="bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded">
          <span className="text-cyan-400 font-bold text-xs tracking-widest">20% COMPLETE</span>
        </div>
      </div>

      <div className="w-full bg-slate-900 rounded-full h-1.5 mb-8 overflow-hidden border border-slate-800">
        <div className="bg-cyan-500 h-full w-[20%]"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Completed */}
        <div>
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Completed</div>
          <ul className="space-y-3">
            {[
              'Problem definition',
              'SHM architecture',
              'ML approach selection',
              'Dashboard prototype',
              'Simulation engine'
            ].map(task => (
              <li key={task} className="flex items-start">
                <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 shrink-0 mt-0.5" />
                <span className="text-xs font-medium text-slate-300">{task}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* In Progress */}
        <div>
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">In Progress</div>
          <ul className="space-y-3">
            {[
              'Dataset preparation',
              'Feature engineering'
            ].map(task => (
              <li key={task} className="flex items-start">
                <CircleDashed className="w-4 h-4 text-amber-500 mr-2 shrink-0 mt-0.5 animate-spin-slow" style={{ animationDuration: '4s' }} />
                <span className="text-xs font-medium text-amber-200">{task}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Planned */}
        <div>
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Planned</div>
          <ul className="space-y-3">
            {[
              'Physical bridge model',
              'ESP32 integration',
              'MPU6050 data collection',
              'Random Forest training',
              'Hardware validation'
            ].map(task => (
              <li key={task} className="flex items-start">
                <Circle className="w-4 h-4 text-slate-600 mr-2 shrink-0 mt-0.5" />
                <span className="text-xs font-medium text-slate-500">{task}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}
