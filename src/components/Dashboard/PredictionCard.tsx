"use client";

import { useSimulation } from '@/context/SimulationContext';
import { BrainCircuit } from 'lucide-react';
import { useEffect, useState } from 'react';
import { buildPonneriFeatureVector } from '@/lib/featureMapper';

export function PredictionCard() {
  const { currentData } = useSimulation();
  const [modelInfo, setModelInfo] = useState<any>(null);
  const [prediction, setPrediction] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      if (!currentData) return;
      try {
        const infoRes = await fetch('/api/model-info');
        const info = await infoRes.json();
        setModelInfo(info);

        if (info.trained) {
           const payloadFeatures = buildPonneriFeatureVector(currentData, info.baseline, info.features);

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
  }, [currentData]);

  const isTrained = modelInfo?.trained;
  const isAnomaly = prediction?.prediction === 1;

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm flex flex-col h-full">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <BrainCircuit className="w-5 h-5 text-[#2563EB]" />
            <h3 className="text-[#111827] font-bold uppercase text-xs tracking-widest">
              ML PREDICTION
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
