"use client";

import { useSimulation } from '@/context/SimulationContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

export function HealthTrend() {
  const { history, health } = useSimulation();

  if (!history || history.length === 0 || !health) return <div className="h-[250px] bg-white rounded-xl border border-[#E2E8F0] shadow-sm animate-pulse mb-8"></div>;

  const compareIndex = Math.max(0, history.length - 20);
  const oldScore = history[compareIndex]?.score || health.score;
  const change = health.score - oldScore;
  const changePercent = oldScore === 0 ? 0 : (change / oldScore) * 100;

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 h-[300px] flex flex-col shadow-sm mb-8">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-[#111827] font-bold uppercase text-xs tracking-widest">Health Trend</h3>
        </div>
        <div className="text-right">
          <div className="text-lg font-black text-[#111827]">Current: {health.score}</div>
          <div className={`text-xs font-bold tracking-wider ${change > 0 ? 'text-[#16A34A]' : change < 0 ? 'text-[#DC2626]' : 'text-[#64748B]'}`}>
            Change: {change > 0 ? '+' : ''}{changePercent.toFixed(1)}%
          </div>
        </div>
      </div>

      <div className="flex-1 w-full min-h-0 mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={history} margin={{ top: 5, right: 0, left: -25, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis dataKey="timestamp" stroke="#94a3b8" fontSize={10} tickMargin={10} minTickGap={30} />
            <YAxis stroke="#94a3b8" fontSize={10} domain={[0, 100]} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '8px', boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)' }}
              itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
              labelStyle={{ fontSize: '10px', color: '#64748b', marginBottom: '4px', textTransform: 'uppercase' }}
            />
            <Line 
              type="monotone" 
              dataKey="score"
              stroke="#2563EB"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
