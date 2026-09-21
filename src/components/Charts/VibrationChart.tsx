"use client";

import { useSimulation } from '@/context/SimulationContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

export function VibrationChart() {
  const { history } = useSimulation();

  return (
    <div className="bg-[#0D1422] border border-slate-800 rounded-2xl p-5 h-[300px] flex flex-col shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-white font-bold uppercase text-xs tracking-widest">Vibration Response</h3>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Simulated acceleration signal</p>
        </div>
        <div className="flex items-center space-x-2 bg-slate-900 px-2 py-1 rounded border border-slate-800">
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></div>
          <span className="text-[10px] font-bold text-slate-400 tracking-wider">SIMULATED STREAM</span>
        </div>
      </div>

      <div className="flex-1 w-full min-h-0 mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={history} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis dataKey="timestamp" stroke="#64748b" fontSize={10} tickMargin={10} />
            <YAxis stroke="#64748b" fontSize={10} tickFormatter={(val) => val.toFixed(1)} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px' }}
              itemStyle={{ fontSize: '12px' }}
              labelStyle={{ fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}
            />
            <Line type="monotone" dataKey="accelX" stroke="#f87171" strokeWidth={1.5} dot={false} name="Accel X" isAnimationActive={false} />
            <Line type="monotone" dataKey="accelY" stroke="#60a5fa" strokeWidth={1.5} dot={false} name="Accel Y" isAnimationActive={false} />
            <Line type="monotone" dataKey="accelZ" stroke="#34d399" strokeWidth={1.5} dot={false} name="Accel Z" isAnimationActive={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
