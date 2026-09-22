"use client";

import { useSimulation } from '@/context/SimulationContext';
import { AlertCircle, Brain } from 'lucide-react';
import { useState, useEffect } from 'react';
import { buildPonneriFeatureVector } from '@/lib/featureMapper';

type ShapData = {
  status: string;
  message?: string;
  prediction?: number;
  probability?: number;
  expected_value?: number;
  base_value?: number;
  shap_values?: Record<string, number>;
  contributions?: { feature: string; value: number; contribution: number }[];
  model_name?: string;
  global_importance?: Record<string, number>;
};

export function ShapExplanation() {
  const { currentData } = useSimulation();
  const [shapData, setShapData] = useState<ShapData | null>(null);
  const [loading, setLoading] = useState(true);
  const [modelInfo, setModelInfo] = useState<any>(null);

  useEffect(() => {
    async function fetchExplanation() {
      if (!currentData) return;
      try {
        const infoRes = await fetch('/api/model-info');
        const info = await infoRes.json();
        setModelInfo(info);
        
        let payloadFeatures: Record<string, number> = {};
        
        if (info.trained && info.features) {
          payloadFeatures = buildPonneriFeatureVector(currentData, info.baseline, info.features);
        } else {
          const numericFeatures: Record<string, number> = {};
          for (const [key, value] of Object.entries(currentData)) {
            if (typeof value === 'number') {
              numericFeatures[key] = value;
            }
          }
          payloadFeatures = numericFeatures;
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
  }, [currentData]);

  if (loading) {
    return <div className="animate-pulse bg-[#F5F7FA] h-48 rounded-xl border border-[#E2E8F0]"></div>;
  }

  const isModelTrained = shapData?.status === "EXPLAINABILITY_READY";

  if (!isModelTrained) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#E2E8F0] mt-6">
        <div className="flex items-center gap-3 mb-6 border-b border-[#E2E8F0] pb-4">
          <div className="bg-amber-100 p-2 rounded-lg">
            <AlertCircle className="w-5 h-5 text-amber-600" />
          </div>
          <h3 className="text-sm font-black text-[#111827] uppercase tracking-widest">SHAP EXPLAINABILITY</h3>
        </div>
        <div className="bg-[#F5F7FA] border border-[#E2E8F0] rounded-xl p-8 flex flex-col items-center justify-center text-center">
          <span className="text-[#64748B] font-bold text-[10px] uppercase tracking-widest mb-2">SHAP READY — WAITING FOR TRAINED MODEL</span>
          <p className="text-xs text-[#94A3B8] font-medium max-w-sm leading-relaxed">
            FEATURE-LEVEL EXPLANATION PENDING
            <br />
            {shapData?.message || "Train a model to see dynamic feature contributions."}
          </p>
        </div>
      </div>
    );
  }

  // Parse SHAP values
  const contributions = shapData?.contributions || [];
  
  // Top 10 by absolute contribution
  const sortedFeatures = contributions.slice(0, 10);

  const predictionText = shapData.prediction === 1 ? 'VIBRATION ANOMALY' : 'AMBIENT NORMAL';
  const confidence = shapData.probability !== undefined ? `${(shapData.probability * 100).toFixed(1)}%` : 'N/A';

  return (
    <div className="bg-white rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#E2E8F0] mt-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 border-b border-[#E2E8F0] pb-4">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-50 border border-indigo-100 p-2 rounded-lg">
            <Brain className="w-5 h-5 text-indigo-600" />
          </div>
          <h3 className="text-sm font-black text-[#111827] uppercase tracking-widest">
            WHY DID THE MODEL MAKE THIS PREDICTION?
          </h3>
        </div>
      </div>

      <div className="mb-6 text-xs font-bold flex justify-between bg-gray-50 p-4 rounded-lg border border-gray-200">
         <span className="text-gray-500 uppercase tracking-wider">Prediction: <span className={shapData.prediction === 1 ? "text-red-600 ml-1" : "text-green-600 ml-1"}>{predictionText}</span></span>
         <span className="text-gray-500 uppercase tracking-wider">Confidence: <span className="text-gray-800 ml-1">{confidence}</span></span>
      </div>

      <h4 className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest mb-4">
        SHAP FEATURE CONTRIBUTIONS
      </h4>

      <div className="space-y-4 mb-6">
        {sortedFeatures.map((item, idx) => {
          const feature = item.feature;
          const numVal = item.contribution;
          const isPositive = numVal > 0;
          return (
            <div key={idx} className="flex items-center justify-between group">
              <span className="text-xs font-medium text-[#475569] uppercase truncate w-1/3" title={feature}>
                {feature.replace(/_/g, ' ')}
              </span>
              <div className="flex-1 mx-4 flex items-center justify-end">
                {/* Visual Bar */}
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden flex relative">
                   <div className="absolute left-1/2 w-[1px] h-full bg-gray-400 z-10"></div>
                   <div 
                      className={`absolute h-full rounded-full ${isPositive ? 'bg-red-500' : 'bg-green-500'}`}
                      style={{
                         width: `${Math.min(Math.abs(numVal) * 40, 50)}%`, // Rough scaling for UI 
                         [isPositive ? 'left' : 'right']: '50%'
                      }}
                   ></div>
                </div>
              </div>
              <span className={`text-xs font-bold w-16 text-right ${isPositive ? 'text-red-600' : 'text-green-600'}`}>
                {isPositive ? '+' : ''}{numVal.toFixed(4)}
              </span>
            </div>
          )
        })}
      </div>

      <div className="pt-4 border-t border-[#E2E8F0] flex justify-between text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
         <span>Base value: {shapData.expected_value !== undefined ? shapData.expected_value.toFixed(4) : shapData.base_value?.toFixed(4)}</span>
         <span>Model: {shapData.model_name || modelInfo?.model}</span>
      </div>

      {/* Debug State */}
      <div className="mt-6 p-3 bg-slate-50 border border-slate-200 rounded-lg text-[10px] text-slate-500 font-mono flex flex-wrap gap-x-4 gap-y-2">
         <span><strong className="text-slate-700">SHAP STATUS:</strong> CONNECTED</span>
         <span><strong className="text-slate-700">Features:</strong> {modelInfo?.features?.length || 24}</span>
         <span><strong className="text-slate-700">Explainer:</strong> LinearExplainer</span>
         <span><strong className="text-slate-700">Explanation:</strong> Local</span>
      </div>
    </div>
  );
}
