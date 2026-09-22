"use client";

import { useSimulation } from '@/context/SimulationContext';
import { BrainCircuit } from 'lucide-react';
import { useEffect, useState } from 'react';

export function PredictionCard() {
  const { currentInputs } = useSimulation();
  const [modelInfo, setModelInfo] = useState<any>(null);
  const [prediction, setPrediction] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const infoRes = await fetch('/api/model-info');
        const info = await infoRes.json();
        setModelInfo(info);

        if (info.trained) {
           // We can also fetch the exact prediction from the explanation endpoint
           let payloadFeatures: Record<string, number> = {};
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
           
           if (info.features) {
             info.features.forEach((f: string) => {
               if (!(f in payloadFeatures)) {
                 payloadFeatures[f] = info.baseline?.mean?.[f] || 0;
               }
             });
           }

           const predRes = await fetch('/api/explanation', {
             method: 'POST',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify({ features: payloadFeatures })
           });
           const predData = await predRes.json();
           setPrediction(predData);
        }
      } catch (e) {
        console.error(e);
      }
    }
    fetchData();
  }, [currentInputs]);

  const isTrained = modelInfo?.trained;
  const isAnomaly = prediction?.prediction === 1;

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm flex flex-col h-full">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <BrainCircuit className="w-5 h-5 text-[#2563EB]" />
          <h3 className="text-[#111827] font-bold uppercase text-xs tracking-widest">
            AI PREDICTION
          </h3>
        </div>
        <span className={`flex items-center text-[10px] font-bold uppercase tracking-widest border px-2.5 py-1 rounded w-fit ${isTrained ? (isAnomaly ? 'bg-red-50 text-red-600 border-red-200' : 'bg-green-50 text-green-600 border-green-200') : 'bg-[#F5F7FA] text-[#64748B] border-[#E2E8F0]'}`}>
          <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${isTrained ? (isAnomaly ? 'bg-red-600' : 'bg-green-600') : 'bg-[#64748B]'}`}></span>
          {isTrained ? (isAnomaly ? 'TRAIN PASSAGE DETECTED' : 'AMBIENT NORMAL') : 'NOT TRAINED'}
        </span>
      </div>

      <div className="space-y-4 mb-6 flex-1">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-[#E2E8F0] pb-3 gap-1">
          <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest">Condition</span>
          <span className={`text-sm font-bold ${isTrained ? (isAnomaly ? 'text-red-600' : 'text-green-600') : 'text-[#111827] opacity-50 italic'}`}>
            {isTrained ? (isAnomaly ? 'VIBRATION ANOMALY' : 'NORMAL') : 'Waiting for model...'}
          </span>
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-[#E2E8F0] pb-3 gap-1">
          <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest">Selected Model</span>
          <span className={`text-sm font-bold ${isTrained ? 'text-[#111827]' : 'text-[#111827] opacity-50 italic'}`}>
            {isTrained ? modelInfo?.model : 'Pending Comparison'}
          </span>
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-[#E2E8F0] pb-3 gap-1">
          <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest">Confidence</span>
          <span className="text-sm font-bold text-[#111827] opacity-50 italic">
            {prediction?.probability !== undefined && prediction?.probability !== null ? `${(prediction.probability * 100).toFixed(1)}%` : 'N/A'}
          </span>
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pt-1 gap-1">
          <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest">Dataset</span>
          <span className="text-sm font-bold text-[#111827]">Ponneri Bridge SHM</span>
        </div>
      </div>

      {!isTrained && (
        <div className="bg-[#F5F7FA] border border-[#E2E8F0] rounded-lg p-5 text-center mt-2">
          <p className="text-xs font-medium text-[#64748B] leading-relaxed">
            Real ML prediction will appear after the selected model is trained and validated.
          </p>
        </div>
      )}
    </div>
  );
}
