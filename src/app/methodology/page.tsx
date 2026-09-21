export default function MethodologyPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold text-white tracking-wide">Methodology</h2>
        <p className="text-sm text-gray-400 mt-1">AI-Powered Structural Health Monitoring Approach.</p>
      </div>

      <div className="bg-[#0B1120] border border-gray-800 rounded-xl p-8 space-y-8 text-gray-300 leading-relaxed">
        
        <section>
          <h3 className="text-lg font-bold text-white mb-3 flex items-center">
            <span className="w-6 h-6 rounded bg-cyan-900/50 text-cyan-400 flex items-center justify-center mr-3 text-xs">1</span>
            Structural Health Monitoring (SHM)
          </h3>
          <p className="text-sm">
            BridgeGuard AI implements a data-driven Structural Health Monitoring (SHM) methodology. Rather than relying solely on periodic manual inspections, this system utilizes continuous IoT sensor data to estimate structural integrity. The prototype simulates conditions to validate the ML pipeline before hardware deployment.
          </p>
        </section>

        <section>
          <h3 className="text-lg font-bold text-white mb-3 flex items-center">
            <span className="w-6 h-6 rounded bg-cyan-900/50 text-cyan-400 flex items-center justify-center mr-3 text-xs">2</span>
            Sensor Acquisition & Feature Extraction
          </h3>
          <p className="text-sm mb-3">
            In the hardware phase, an ESP32 microcontroller will collect data from MPU6050 (accelerometer/gyroscope) and DHT11 (temperature/humidity) sensors.
          </p>
          <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800 text-sm">
            <div className="font-semibold text-gray-200 mb-2">Key Features Extracted:</div>
            <ul className="list-disc pl-5 space-y-1 text-gray-400">
              <li><span className="text-cyan-400">RMS (Root Mean Square):</span> Indicates overall vibration energy.</li>
              <li><span className="text-cyan-400">Peak Acceleration:</span> Maximum shock or stress event.</li>
              <li><span className="text-cyan-400">Standard Deviation:</span> Variance in structural response.</li>
              <li><span className="text-cyan-400">Dominant Frequency:</span> Shifts indicate stiffness changes.</li>
              <li><span className="text-cyan-400">Tilt (Roll/Pitch):</span> Static deformation or settlement.</li>
            </ul>
          </div>
        </section>

        <section>
          <h3 className="text-lg font-bold text-white mb-3 flex items-center">
            <span className="w-6 h-6 rounded bg-cyan-900/50 text-cyan-400 flex items-center justify-center mr-3 text-xs">3</span>
            Machine Learning Pipeline
          </h3>
          <p className="text-sm mb-3">
            The project proposes a <strong className="text-white">Random Forest Classifier</strong> for condition assessment. Random Forests are robust against overfitting and provide feature importance metrics, making them ideal for interpreting physical sensor data.
          </p>
          <p className="text-sm">
            Currently, the dashboard utilizes a deterministic prototype scoring engine mapping simulated physical changes to health scores. This will be replaced by the trained Random Forest model in the final phase.
          </p>
        </section>

        <section className="pt-6 border-t border-gray-800">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Academic References</h3>
          <ul className="space-y-3 text-xs text-gray-500">
            <li>[1] Entezami et al. (2022) - Structural Health Monitoring methodologies.</li>
            <li>[2] Soltani et al. - Machine learning applications in structural engineering.</li>
            <li>[3] Concrete and steel bridge SHM (2023) - Sensor deployment strategies.</li>
            <li>[4] Chakali et al. (2024) - Advanced feature extraction for vibration analysis.</li>
            <li>[5] Integration of Railway Bridge SHM into IoT with a Digital Twin (2024).</li>
            <li>[6] Zhu et al. (2024) - Anomaly detection in continuous monitoring.</li>
            <li>[7] Entezami et al. (2024) - Early damage detection frameworks.</li>
            <li>[8] Physics-Informed ML in bridges (2025) - Bridging physical models and AI.</li>
            <li>[9] Vibration-Based ML Model Training for Railway Bridge Health Monitoring (2026).</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
