"use client";

import { BrainCircuit, Info } from "lucide-react";

export function ShapExplanation() {
  const isModelTrained = false; // True only when a real ML model is connected

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
            <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] mr-1.5"></span>
            SHAP READY — WAITING FOR TRAINED MODEL
          </span>
        )}
      </div>

      {!isModelTrained ? (
        <div className="bg-[#F5F7FA] border border-[#E2E8F0] rounded-xl p-8 text-center flex flex-col items-center justify-center">
          <Info className="w-8 h-8 text-[#64748B] mb-3" />
          <h4 className="text-[#111827] font-bold text-sm tracking-wide mb-2 uppercase">Feature-level explanation pending</h4>
          <p className="text-xs font-medium text-[#64748B] leading-relaxed max-w-lg">
            Feature-level explanation will be generated after the selected ML model is trained and validated on the bridge-specific dataset.
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
          </div>

          {/* Global Importance */}
          <div>
            <h4 className="text-xs font-bold text-[#111827] uppercase tracking-widest mb-4">Global Feature Importance</h4>
            <p className="text-[10px] font-medium text-[#64748B] uppercase tracking-widest mb-4">Which features generally influence the model?</p>
            {/* Real global bars will go here */}
          </div>
        </div>
      )}
    </div>
  );
}
