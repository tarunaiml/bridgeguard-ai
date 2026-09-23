export function ArchitectureDiagram() {
  const steps = [
    'ESP32 + Sensors',
    'Sensor measurements',
    'Data acquisition / transmission',
    'Preprocessing',
    'Health-relative feature extraction',
    'Normalization',
    'ML model comparison',
    'Selected ML model',
    'Prediction',
    'SHAP explainability',
    'BridgeGuard ML dashboard'
  ];

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-8 shadow-sm">
      <h3 className="text-[#111827] font-bold uppercase text-xs tracking-widest mb-2 text-center">System Architecture</h3>
      <p className="text-center text-[10px] font-bold text-[#64748B] tracking-widest uppercase mb-8">PLANNED HARDWARE PIPELINE</p>
      
      <div className="flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-2 w-full overflow-x-auto pb-4">
        {steps.map((step, idx) => (
          <div key={idx} className="flex flex-col md:flex-row items-center">
            <div className="bg-[#F5F7FA] border border-[#E2E8F0] text-[#111827] text-[10px] font-bold tracking-widest px-3 py-2 rounded uppercase whitespace-nowrap text-center min-w-[120px]">
              {step}
            </div>
            {idx < steps.length - 1 && (
              <div className="text-[#64748B] mx-2 font-bold rotate-90 md:rotate-0 my-2 md:my-0">
                →
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
