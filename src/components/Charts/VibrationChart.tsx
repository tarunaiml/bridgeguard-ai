"use client";

import { useSimulation } from '@/context/SimulationContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import clsx from 'clsx';

export function VibrationChart() {
  const { history, mode } = useSimulation();

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 h-[350px] flex flex-col shadow-sm">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-[#111827] font-bold uppercase text-xs tracking-widest">Live Vibration Response</h3>
        </div>
        <div className={clsx(
          "px-3 py-1 rounded text-[10px] font-bold tracking-wider uppercase border",
          mode === 'SIMULATION' ? "bg-[#eff6ff] text-[#2563EB] border-[#bfdbfe]" : "bg-[#fffbeb] text-[#F59E0B] border-[#fde68a]"
        )}>
          {mode === 'SIMULATION' ? 'SIMULATED' : 'MANUAL INPUT'}
        </div>
      </div>

      <div className="flex-1 w-full min-h-0 mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={history} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis dataKey="timestamp" stroke="#94a3b8" fontSize={10} tickMargin={10} />
            <YAxis stroke="#94a3b8" fontSize={10} tickFormatter={(val) => val.toFixed(1)} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '8px', boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)' }}
              itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
              labelStyle={{ fontSize: '10px', color: '#64748b', marginBottom: '4px' }}
            />
            <Line type="monotone" dataKey="accelX" stroke="#ef4444" strokeWidth={2} dot={false} name="Accel X" isAnimationActive={false} />
            <Line type="monotone" dataKey="accelY" stroke="#3b82f6" strokeWidth={2} dot={false} name="Accel Y" isAnimationActive={false} />
            <Line type="monotone" dataKey="accelZ" stroke="#10b981" strokeWidth={2} dot={false} name="Accel Z" isAnimationActive={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
