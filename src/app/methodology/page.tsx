import { PageIntro } from "@/components/Layout/PageIntro";

export default function MethodologyPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-6 pb-12">
      <PageIntro eyebrow="Methodology" title="How the prototype works" description="A transparent outline of the monitoring inputs, feature extraction, and model-validation path." />

      <div className="space-y-12 rounded-2xl border border-slate-200 bg-white p-8 leading-relaxed text-slate-600 shadow-sm md:p-12">
        
        <section>
          <h3 className="mb-4 flex text-lg font-semibold tracking-tight text-slate-950">
            <span className="mr-4 flex h-8 w-8 items-center justify-center rounded border border-blue-200 bg-blue-50 text-sm text-blue-700">1</span>
            Structural Health Monitoring (SHM)
          </h3>
          <p className="text-sm">
            BridgeGuard ML implements a data-driven Structural Health Monitoring (SHM) methodology. Rather than relying solely on periodic manual inspections, this system utilizes continuous IoT sensor data to estimate structural integrity. The prototype simulates conditions to validate the ML pipeline before hardware deployment.
          </p>
        </section>

        <section>
          <h3 className="mb-4 flex text-lg font-semibold tracking-tight text-slate-950"><span className="mr-4 flex h-8 w-8 items-center justify-center rounded border border-blue-200 bg-blue-50 text-sm text-blue-700">2</span>
            Sensor Acquisition & Feature Extraction
          </h3>
          <p className="text-sm mb-4">
            In the hardware phase, an ESP32 microcontroller will collect data from MPU6050 (accelerometer/gyroscope) and DHT11 (temperature/humidity) sensors.
          </p>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-sm"><div className="mb-4 text-[10px] font-bold uppercase tracking-widest text-slate-700">Key features extracted</div><ul className="space-y-3 text-slate-600">
              <li className="flex"><span className="mr-2 w-32 shrink-0 font-bold tracking-wider text-blue-700">RMS</span> Indicates overall vibration energy.</li><li className="flex"><span className="mr-2 w-32 shrink-0 font-bold tracking-wider text-blue-700">PEAK ACCEL</span> Maximum shock or stress event.</li><li className="flex"><span className="mr-2 w-32 shrink-0 font-bold tracking-wider text-blue-700">STD DEV</span> Variance in structural response.</li><li className="flex"><span className="mr-2 w-32 shrink-0 font-bold tracking-wider text-blue-700">DOM FREQ</span> Shifts indicate stiffness changes.</li><li className="flex"><span className="mr-2 w-32 shrink-0 font-bold tracking-wider text-blue-700">TILT</span> Static deformation or settlement.</li>
            </ul>
          </div>
        </section>

        <section>
          <h3 className="mb-4 flex text-lg font-semibold tracking-tight text-slate-950"><span className="mr-4 flex h-8 w-8 items-center justify-center rounded border border-blue-200 bg-blue-50 text-sm text-blue-700">3</span>
            Machine Learning Pipeline
          </h3>
          <p className="text-sm mb-4">
            The project proposes a <strong className="text-slate-950">Random Forest Classifier</strong> for condition assessment. Random Forests are robust against overfitting and provide feature importance metrics, making them ideal for interpreting physical sensor data.
          </p>
          <p className="text-sm">
            Currently, the dashboard utilizes a deterministic prototype scoring engine mapping simulated physical changes to health scores. This will be replaced by the trained Random Forest model in the final phase.
          </p>
        </section>

        <section className="border-t border-slate-200 pt-8"><h3 className="mb-6 text-[10px] font-bold uppercase tracking-widest text-slate-500">Academic references</h3><ul className="space-y-4 text-xs font-medium text-slate-600">
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
