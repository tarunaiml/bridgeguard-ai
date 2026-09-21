"use client";

import { useSimulation } from '@/context/SimulationContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

export function VibrationChart() {
  const { history } = useSimulation();

  return (
    <div className="bg-[#0B1120] border border-gray-800 rounded-xl p-5 h-[400px] flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-white font-medium uppercase text-sm tracking-wider">Vibration Response</h3>
          <p className="text-xs text-gray-500">Acceleration (g) over time</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-400">SIMULATED STREAM</span>
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
        </div>
      </div>

      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={history} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
            <XAxis dataKey="timestamp" stroke="#4b5563" fontSize={10} tickMargin={10} />
            <YAxis stroke="#4b5563" fontSize={10} tickFormatter={(val) => val.toFixed(1)} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0B1120', borderColor: '#1f2937', borderRadius: '8px' }}
              itemStyle={{ fontSize: '12px' }}
              labelStyle={{ fontSize: '12px', color: '#9ca3af', marginBottom: '4px' }}
            />
            <Line type="monotone" dataKey="accelX" stroke="#ef4444" strokeWidth={1.5} dot={false} name="Accel X" isAnimationActive={false} />
            <Line type="monotone" dataKey="accelY" stroke="#3b82f6" strokeWidth={1.5} dot={false} name="Accel Y" isAnimationActive={false} />
            <Line type="monotone" dataKey="accelZ" stroke="#10b981" strokeWidth={1.5} dot={false} name="Accel Z" isAnimationActive={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
