import { CheckCircle2, Circle } from 'lucide-react';

export function ProjectProgress() {
  const tasks = [
    { name: 'Project concept & planning', done: true },
    { name: 'SHM methodology defined', done: true },
    { name: 'ML approach selected (Random Forest)', done: true },
    { name: 'Dashboard prototype built', done: true },
    { name: 'Simulation engine operational', done: true },
    { name: 'Physical bridge prototype construction', done: false },
    { name: 'ESP32 sensor integration', done: false },
    { name: 'Real dataset collection', done: false },
    { name: 'Random Forest training', done: false },
    { name: 'Hardware validation & final testing', done: false },
  ];

  const completed = tasks.filter(t => t.done).length;
  const progress = Math.round((completed / tasks.length) * 100);

  return (
    <div className="bg-[#0B1120] border border-gray-800 rounded-xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-white font-medium uppercase text-sm tracking-wider">Project Progress</h3>
        <div className="text-right">
          <div className="text-xl font-bold text-cyan-400">{progress}%</div>
          <div className="text-[10px] text-gray-500 uppercase tracking-wider">Completion</div>
        </div>
      </div>

      <div className="w-full bg-gray-800 rounded-full h-2 mb-6 overflow-hidden">
        <div className="bg-cyan-500 h-full transition-all duration-1000" style={{ width: `${progress}%` }}></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tasks.map((task, i) => (
          <div key={i} className="flex items-start">
            {task.done ? (
              <CheckCircle2 className="w-4 h-4 text-cyan-500 mt-0.5 mr-3 shrink-0" />
            ) : (
              <Circle className="w-4 h-4 text-gray-600 mt-0.5 mr-3 shrink-0" />
            )}
            <span className={task.done ? 'text-gray-300 text-sm' : 'text-gray-500 text-sm'}>
              {task.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
