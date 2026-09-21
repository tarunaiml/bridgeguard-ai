export function FeatureImportance() {
  const features = [
    { name: 'RMS Acceleration', value: 31, color: 'bg-cyan-500' },
    { name: 'Dominant Frequency', value: 24, color: 'bg-cyan-600' },
    { name: 'Tilt', value: 19, color: 'bg-cyan-700' },
    { name: 'Peak Acceleration', value: 15, color: 'bg-cyan-800' },
    { name: 'Temperature', value: 7, color: 'bg-gray-600' },
    { name: 'Std. Deviation', value: 4, color: 'bg-gray-700' },
  ];

  return (
    <div className="bg-[#0B1120] border border-gray-800 rounded-xl p-5">
      <h3 className="text-white font-medium uppercase text-sm tracking-wider mb-2">ML Feature Analysis</h3>
      <p className="text-[10px] text-gray-500 mb-6 uppercase tracking-wider">
        Illustrative prototype feature importance — to be replaced by measured model importance after training.
      </p>

      <div className="space-y-4">
        {features.map(f => (
          <div key={f.name}>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-300">{f.name}</span>
              <span className="text-gray-400 font-mono">{f.value}%</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
              <div className={`h-full ${f.color}`} style={{ width: `${f.value}%` }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
