export function FeatureImportance() {
  const features = [
    { name: 'RMS Acceleration', value: 31, color: 'bg-cyan-400' },
    { name: 'Dominant Frequency', value: 24, color: 'bg-cyan-500' },
    { name: 'Tilt', value: 19, color: 'bg-cyan-600' },
    { name: 'Peak Acceleration', value: 15, color: 'bg-cyan-700' },
    { name: 'Temperature', value: 7, color: 'bg-slate-500' },
    { name: 'Std. Deviation', value: 4, color: 'bg-slate-600' },
  ];

  return (
    <div className="bg-[#0D1422] border border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col h-full">
      <h3 className="text-white font-bold uppercase text-xs tracking-widest mb-1">ML Feature Analysis</h3>
      <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-8">
        Illustrative prototype feature importance
      </p>

      <div className="space-y-5 flex-1 flex flex-col justify-center">
        {features.map(f => (
          <div key={f.name}>
            <div className="flex justify-between text-[11px] font-bold tracking-wider mb-2">
              <span className="text-slate-300 uppercase">{f.name}</span>
              <span className="text-slate-400 font-mono">{f.value}%</span>
            </div>
            <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden border border-slate-800">
              <div className={`h-full ${f.color}`} style={{ width: `${f.value}%` }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
