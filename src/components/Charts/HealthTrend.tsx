"use client";

import { useSimulation } from '@/context/SimulationContext';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

export function HealthTrend() {
  const { history, health } = useSimulation();

  return (
    <div className="bg-[#0B1120] border border-gray-800 rounded-xl p-5 h-[300px] flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-white font-medium uppercase text-sm tracking-wider">Health Trend</h3>
          <p className="text-xs text-gray-500">Simulated historical health score</p>
        </div>
        <div className="text-right">
          <div className="text-xl font-bold text-white">{health?.score || 0} / 100</div>
          <div className="text-xs text-cyan-400">Live updating...</div>
        </div>
      </div>

      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={history} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
            <XAxis dataKey="timestamp" stroke="#4b5563" fontSize={10} tickMargin={10} minTickGap={30} />
            <YAxis stroke="#4b5563" fontSize={10} domain={[0, 100]} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0B1120', borderColor: '#1f2937', borderRadius: '8px' }}
              itemStyle={{ fontSize: '12px' }}
              labelStyle={{ fontSize: '12px', color: '#9ca3af', marginBottom: '4px' }}
            />
            <Area 
              type="monotone" 
              dataKey="score"
              stroke="#06b6d4" 
              fillOpacity={1} 
              fill="url(#colorScore)" 
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
