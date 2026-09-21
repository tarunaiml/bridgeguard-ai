import { CheckCircle2, Circle } from 'lucide-react';

export function ProjectProgress() {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-[#111827] font-bold uppercase text-xs tracking-widest">Project Progress</h3>
        <div className="text-xl font-black text-[#2563EB]">20%</div>
      </div>

      <div className="w-full bg-[#F5F7FA] rounded-full h-2 mb-8 overflow-hidden border border-[#E2E8F0]">
        <div className="bg-[#2563EB] h-full w-[20%]"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest mb-4">Completed</div>
          <ul className="space-y-3">
            {[
              'Dashboard Prototype',
              'Simulation Engine',
              'System Architecture',
              'Real Dataset Identified',
            ].map(task => (
              <li key={task} className="flex items-start">
                <CheckCircle2 className="w-4 h-4 text-[#16A34A] mr-3 shrink-0 mt-0.5" />
                <span className="text-xs font-bold text-[#111827]">{task}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest mb-4">Pending</div>
          <ul className="space-y-3">
            {[
              'ML Training',
              'ESP32 Sensor Integration',
              'Physical Bridge Model'
            ].map(task => (
              <li key={task} className="flex items-start">
                <Circle className="w-4 h-4 text-[#64748B] mr-3 shrink-0 mt-0.5" />
                <span className="text-xs font-bold text-[#64748B]">{task}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
