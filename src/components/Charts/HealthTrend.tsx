"use client";

import { useSimulation } from '@/context/SimulationContext';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import { TrendingDown, TrendingUp, Minus } from 'lucide-react';

export function HealthTrend() {
  const { history, health } = useSimulation();

  if (!history || history.length === 0 || !health) return <div className="h-[250px] bg-[#0D1422] rounded-2xl border border-slate-800 animate-pulse"></div>;

  // Calculate change over last 20 ticks if available
  const compareIndex = Math.max(0, history.length - 20);
  const oldScore = history[compareIndex]?.score || health.score;
  const change = health.score - oldScore;
  const changePercent = oldScore === 0 ? 0 : (change / oldScore) * 100;

  return (
    <div className="bg-[#0D1422] border border-slate-800 rounded-2xl p-5 h-[300px] flex flex-col shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-white font-bold uppercase text-xs tracking-widest">Health Trend</h3>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Simulated historical health score</p>
        </div>
        <div className="text-right flex flex-col items-end">
          <div className="text-2xl font-black text-white tracking-widest">{health.score}</div>
          <div className={`flex items-center text-[10px] font-bold tracking-wider mt-1 ${change > 0 ? 'text-green-400' : change < 0 ? 'text-red-400' : 'text-slate-400'}`}>
            {change > 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : change < 0 ? <TrendingDown className="w-3 h-3 mr-1" /> : <Minus className="w-3 h-3 mr-1" />}
            {Math.abs(changePercent).toFixed(1)}%
          </div>
        </div>
      </div>

      <div className="flex-1 w-full min-h-0 mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={history} margin={{ top: 5, right: 0, left: -25, bottom: 0 }}>
            <defs>
              <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis dataKey="timestamp" stroke="#64748b" fontSize={10} tickMargin={10} minTickGap={30} />
            <YAxis stroke="#64748b" fontSize={10} domain={[0, 100]} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px' }}
              itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
              labelStyle={{ fontSize: '10px', color: '#94a3b8', marginBottom: '4px', textTransform: 'uppercase' }}
            />
            <Area 
              type="monotone" 
              dataKey="score"
              stroke="#06b6d4"
              strokeWidth={2}
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
