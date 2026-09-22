export default function MethodologyPage() {
  return (
    <div className="space-y-8 pb-12 max-w-5xl mx-auto">
      <div>
        <h2 className="text-3xl font-black text-white tracking-tighter mb-2">METHODOLOGY</h2>
        <p className="text-sm font-bold text-slate-400 tracking-widest uppercase mt-1">AI-Powered Structural Health Monitoring Approach.</p>
      </div>

      <div className="bg-[#0D1422] border border-slate-800 rounded-2xl p-8 md:p-12 space-y-12 text-slate-300 leading-relaxed shadow-sm">
        
        <section>
          <h3 className="text-lg font-black text-white tracking-wider uppercase mb-4 flex items-center">
            <span className="w-8 h-8 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mr-4 text-sm">1</span>
            Structural Health Monitoring (SHM)
          </h3>
          <p className="text-sm">
            BridgeGuard ML implements a data-driven Structural Health Monitoring (SHM) methodology. Rather than relying solely on periodic manual inspections, this system utilizes continuous IoT sensor data to estimate structural integrity. The prototype simulates conditions to validate the ML pipeline before hardware deployment.
          </p>
        </section>

        <section>
          <h3 className="text-lg font-black text-white tracking-wider uppercase mb-4 flex items-center">
            <span className="w-8 h-8 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mr-4 text-sm">2</span>
            Sensor Acquisition & Feature Extraction
          </h3>
          <p className="text-sm mb-4">
            In the hardware phase, an ESP32 microcontroller will collect data from MPU6050 (accelerometer/gyroscope) and DHT11 (temperature/humidity) sensors.
          </p>
          <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 text-sm">
            <div className="font-bold text-slate-200 uppercase tracking-widest text-[10px] mb-4">Key Features Extracted:</div>
            <ul className="space-y-3 text-slate-400">
              <li className="flex"><span className="font-bold text-cyan-400 tracking-wider mr-2 w-32 shrink-0">RMS</span> Indicates overall vibration energy.</li>
              <li className="flex"><span className="font-bold text-cyan-400 tracking-wider mr-2 w-32 shrink-0">PEAK ACCEL</span> Maximum shock or stress event.</li>
              <li className="flex"><span className="font-bold text-cyan-400 tracking-wider mr-2 w-32 shrink-0">STD DEV</span> Variance in structural response.</li>
              <li className="flex"><span className="font-bold text-cyan-400 tracking-wider mr-2 w-32 shrink-0">DOM FREQ</span> Shifts indicate stiffness changes.</li>
              <li className="flex"><span className="font-bold text-cyan-400 tracking-wider mr-2 w-32 shrink-0">TILT</span> Static deformation or settlement.</li>
            </ul>
          </div>
        </section>

        <section>
          <h3 className="text-lg font-black text-white tracking-wider uppercase mb-4 flex items-center">
            <span className="w-8 h-8 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mr-4 text-sm">3</span>
            Machine Learning Pipeline
          </h3>
          <p className="text-sm mb-4">
            The project proposes a <strong className="text-white">Random Forest Classifier</strong> for condition assessment. Random Forests are robust against overfitting and provide feature importance metrics, making them ideal for interpreting physical sensor data.
          </p>
          <p className="text-sm">
            Currently, the dashboard utilizes a deterministic prototype scoring engine mapping simulated physical changes to health scores. This will be replaced by the trained Random Forest model in the final phase.
          </p>
        </section>

        <section className="pt-8 border-t border-slate-800">
          <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-6">Academic References</h3>
          <ul className="space-y-4 text-xs text-slate-400 font-medium">
            <li><span className="text-slate-500 mr-2">[1]</span> Entezami et al. (2022) - Structural Health Monitoring methodologies.</li>
            <li><span className="text-slate-500 mr-2">[2]</span> Soltani et al. - Machine learning applications in structural engineering.</li>
            <li><span className="text-slate-500 mr-2">[3]</span> Concrete and steel bridge SHM (2023) - Sensor deployment strategies.</li>
            <li><span className="text-slate-500 mr-2">[4]</span> Chakali et al. (2024) - Advanced feature extraction for vibration analysis.</li>
            <li><span className="text-slate-500 mr-2">[5]</span> Integration of Railway Bridge SHM into IoT with a Digital Twin (2024).</li>
            <li><span className="text-slate-500 mr-2">[6]</span> Zhu et al. (2024) - Anomaly detection in continuous monitoring.</li>
            <li><span className="text-slate-500 mr-2">[7]</span> Entezami et al. (2024) - Early damage detection frameworks.</li>
            <li><span className="text-slate-500 mr-2">[8]</span> Physics-Informed ML in bridges (2025) - Bridging physical models and AI.</li>
            <li><span className="text-slate-500 mr-2">[9]</span> Vibration-Based ML Model Training for Railway Bridge Health Monitoring (2026).</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
