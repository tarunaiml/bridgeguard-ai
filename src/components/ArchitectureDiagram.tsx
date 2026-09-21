export function ArchitectureDiagram() {
  const steps = [
    'BRIDGE MODEL',
    'SENSORS',
    'ESP32',
    'DATA',
    'FEATURE EXTRACTION',
    'ML MODEL',
    'HEALTH SCORE'
  ];

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-8 shadow-sm mb-8">
      <h3 className="text-[#111827] font-bold uppercase text-xs tracking-widest mb-8 text-center">System Pipeline</h3>
      
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

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-[#E2E8F0]">
        <div>
          <h4 className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest mb-2">Current Software Prototype</h4>
          <p className="text-xs font-medium text-[#111827]">
            Simulation → Feature calculation → Prototype prediction → Health score
          </p>
        </div>
        <div>
          <h4 className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest mb-2">Future Integration</h4>
          <p className="text-xs font-medium text-[#111827]">
            ESP32 + MPU6050/DHT11 → Real sensor data → Random Forest
          </p>
        </div>
      </div>
    </div>
  );
}
