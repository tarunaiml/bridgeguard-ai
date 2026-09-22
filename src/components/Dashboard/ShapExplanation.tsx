"use client";

import { BrainCircuit, Info } from "lucide-react";
import { useEffect, useState } from "react";
import { useSimulation } from "@/context/SimulationContext";

interface ShapData {
  status: string;
  message?: string;
  base_value?: number;
  contributions?: { feature: string; value: number; contribution: number }[];
  global_importance?: any;
}

export function ShapExplanation() {
  const { currentInputs } = useSimulation();
  const [shapData, setShapData] = useState<ShapData | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [featureMismatch, setFeatureMismatch] = useState(false);
  const [modelInfo, setModelInfo] = useState<any>(null);

  useEffect(() => {
    async function fetchExplanation() {
      try {
        const infoRes = await fetch('/api/model-info');
        const info = await infoRes.json();
        setModelInfo(info);
        
        let payloadFeatures: Record<string, number> = {};
        
        if (info.trained && info.features) {
          // Map prototype simulation inputs to real Ponneri dataset features
          payloadFeatures = {
            "A1_Acc_1_Y_rms": currentInputs.rms_vibration / 1000,
            "A1_Acc_1_Y_peak": currentInputs.peak_acceleration || (currentInputs.rms_vibration * 1.5) / 1000,
            "A1_Acc_1_Y_var": Math.pow(currentInputs.rms_vibration / 1000, 2),
            "A2_Acc_1_x_rms": currentInputs.tilt / 1000,
            "A2_Acc_1_x_peak": (currentInputs.tilt * 1.5) / 1000,
            "A2_Acc_1_x_var": Math.pow(currentInputs.tilt / 1000, 2),
            "A3_Acc_1_Z_rms": currentInputs.rms_vibration / 2000,
            "A3_Acc_1_Z_peak": (currentInputs.rms_vibration * 1.5) / 2000,
            "A3_Acc_1_Z_var": Math.pow(currentInputs.rms_vibration / 2000, 2)
          };
          
          // Fill missing expected features with 0 (or baseline means)
          info.features.forEach((f: string) => {
            if (!(f in payloadFeatures)) {
               payloadFeatures[f] = info.baseline?.mean?.[f] || 0;
            }
          });
          
          setFeatureMismatch(false);
        } else {
          payloadFeatures = currentInputs;
        }

        const res = await fetch('/api/explanation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            features: payloadFeatures
          }),
        });
        const data = await res.json();
        setShapData(data);
      } catch (error) {
        console.error("Failed to fetch SHAP explanation:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchExplanation();
  }, [currentInputs]);

  if (loading) {
    return <div className="animate-pulse bg-[#F5F7FA] h-48 rounded-xl border border-[#E2E8F0]"></div>;
  }

  if (featureMismatch) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#E2E8F0]">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-amber-100 p-2 rounded-lg">
            <AlertCircle className="w-5 h-5 text-amber-600" />
          </div>
          <h3 className="text-sm font-black text-[#111827] uppercase tracking-widest">SHAP EXPLAINABILITY</h3>
        </div>
        <div className="bg-[#FFFBEB] border border-[#FDE68A] rounded-xl p-4 flex flex-col items-center justify-center text-center">
          <span className="text-[#B45309] font-bold text-xs uppercase tracking-widest mb-2">SIMULATION MODE MISMATCH</span>
          <p className="text-xs text-[#92400E] font-medium leading-relaxed">
            Simulation input does not yet match trained model features.
            The trained model expects {modelInfo?.features?.length} channels (e.g., {modelInfo?.features?.[0]}).
          </p>
        </div>
      </div>
    );
  }

  const isModelTrained = shapData?.status === "EXPLAINABILITY_READY";

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm flex flex-col h-full col-span-1 md:col-span-2 mt-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 pb-4 border-b border-[#E2E8F0] gap-4">
        <div className="flex items-center space-x-2">
          <BrainCircuit className="w-5 h-5 text-[#2563EB]" />
          <h3 className="text-[#111827] font-bold uppercase text-xs tracking-widest">
            WHY DID THE MODEL MAKE THIS PREDICTION?
          </h3>
        </div>
        {!isModelTrained && (
          <span className="flex items-center text-[10px] font-bold uppercase tracking-widest bg-[#fffbeb] text-[#F59E0B] border border-[#fde68a] px-2.5 py-1 rounded w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] mr-1.5 animate-pulse"></span>
            SHAP READY — WAITING FOR TRAINED MODEL
          </span>
        )}
      </div>

      {!isModelTrained ? (
        <div className="bg-[#F5F7FA] border border-[#E2E8F0] rounded-xl p-8 text-center flex flex-col items-center justify-center">
          <Info className="w-8 h-8 text-[#64748B] mb-3" />
          <h4 className="text-[#111827] font-bold text-sm tracking-wide mb-2 uppercase">Feature-level explanation pending</h4>
          <p className="text-xs font-medium text-[#64748B] leading-relaxed max-w-lg">
            {shapData?.message || "Feature-level explanation will be generated after the selected ML model is trained and validated on the bridge-specific dataset."}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <span className="text-[10px] font-bold uppercase tracking-widest bg-white border border-[#E2E8F0] text-[#64748B] px-3 py-1.5 rounded-lg shadow-sm">
              PROPOSED: Local SHAP Explanation
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest bg-white border border-[#E2E8F0] text-[#64748B] px-3 py-1.5 rounded-lg shadow-sm">
              PROPOSED: Global Feature Importance
            </span>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Local Explanation */}
          <div>
            <h4 className="text-xs font-bold text-[#111827] uppercase tracking-widest mb-4">Local Explanation</h4>
            <p className="text-[10px] font-medium text-[#64748B] uppercase tracking-widest mb-4">Why this particular prediction?</p>
            {/* Real SHAP bars will go here */}
            {shapData?.contributions?.map((c, i) => (
              <div key={i} className="mb-2">
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-[#111827]">{c.feature}</span>
                  <span className={c.contribution > 0 ? 'text-red-500' : 'text-blue-500'}>
                    {c.contribution > 0 ? '+' : ''}{c.contribution.toFixed(4)}
                  </span>
                </div>
                {/* Visual Bar */}
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden flex">
                    <div 
                      className={`h-full ${c.contribution > 0 ? 'bg-red-500' : 'bg-blue-500'}`} 
                      style={{width: `${Math.min(Math.abs(c.contribution) * 100, 100)}%`}} 
                    />
                </div>
              </div>
            ))}
            <div className="mt-4 pt-4 border-t border-[#E2E8F0]">
               <button 
                 onClick={() => setModalOpen(true)}
                 className="text-[10px] font-bold uppercase tracking-widest bg-white border border-[#E2E8F0] text-[#2563EB] hover:bg-[#F5F7FA] px-4 py-2 rounded-lg shadow-sm transition-colors"
               >
                 VIEW DETAILED EXPLANATION
               </button>
            </div>
          </div>

          {/* Global Importance */}
          <div>
            <h4 className="text-xs font-bold text-[#111827] uppercase tracking-widest mb-4">Global Feature Importance</h4>
            <p className="text-[10px] font-medium text-[#64748B] uppercase tracking-widest mb-4">Which features generally influence the model?</p>
            <div className="bg-[#F5F7FA] border border-[#E2E8F0] rounded-xl p-4 text-center">
              {shapData?.global_importance ? (
                <pre className="text-xs text-left">{JSON.stringify(shapData.global_importance, null, 2)}</pre>
              ) : (
                <p className="text-xs text-[#64748B]">Global SHAP will be available after model training.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-[9999] bg-[#111827]/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full p-6 relative">
            <h3 className="text-[#111827] font-bold uppercase text-xs tracking-widest border-b border-[#E2E8F0] pb-4 mb-4">Detailed Local Explanation</h3>
            <p className="text-xs text-[#64748B] mb-4 font-medium leading-relaxed">
              Positive contribution pushes the prediction toward the displayed class. Negative contribution pushes the prediction away from the displayed class.
            </p>
            <div className="space-y-4">
              {shapData?.contributions?.map((c, i) => (
                <div key={i} className="flex justify-between items-center text-xs p-3 bg-[#F5F7FA] rounded-lg border border-[#E2E8F0]">
                  <span className="font-bold text-[#111827]">{c.feature}</span>
                  <div className="flex gap-4">
                    <span className="text-[#64748B]">Value: {c.value.toFixed(4)}</span>
                    <span className={c.contribution > 0 ? 'text-red-600 font-bold' : 'text-blue-600 font-bold'}>
                      SHAP: {c.contribution > 0 ? '+' : ''}{c.contribution.toFixed(4)}
                    </span>
                  </div>
                </div>
              ))}
              <div className="text-xs text-[#64748B] mt-2 italic border-t border-[#E2E8F0] pt-2">
                Base Value: {shapData?.base_value?.toFixed(4) || "N/A"}
              </div>
            </div>
            <button 
              onClick={() => setModalOpen(false)}
              className="mt-6 w-full text-[10px] font-bold uppercase tracking-widest bg-[#F5F7FA] border border-[#E2E8F0] text-[#111827] hover:bg-[#E2E8F0] px-4 py-3 rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
