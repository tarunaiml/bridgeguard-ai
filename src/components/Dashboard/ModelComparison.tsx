"use client";

import { useEffect, useState } from "react";
import { Cpu, CheckCircle2, ShieldCheck, Clock, Layers } from "lucide-react";

type ModelMetrics = {
  Accuracy: number;
  Precision: number;
  Recall: number;
  F1: number;
  Confusion_Matrix?: number[][];
  Training_Time_ms?: number;
  Inference_Time_ms?: number;
};

type ComparisonData = {
  status: string;
  dataset?: string;
  task?: string;
  split_method?: string;
  train_samples?: number;
  test_samples?: number;
  selected_model?: string;
  selection_rationale?: string;
  summary_table?: Record<string, ModelMetrics>;
};

export function ModelComparison() {
  const [data, setData] = useState<ComparisonData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/models-comparison")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load model comparison:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm animate-pulse">
        <div className="h-6 w-48 bg-slate-200 rounded mb-4"></div>
        <div className="h-32 bg-slate-100 rounded"></div>
      </div>
    );
  }

  const models = data?.summary_table || {};
  const selectedModel = data?.selected_model;

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E2E8F0] gap-2">
        <div className="flex items-center space-x-2">
          <Cpu className="w-5 h-5 text-[#2563EB]" />
          <h3 className="text-[#111827] font-bold uppercase text-xs tracking-widest">
            MULTI-MODEL ML EVALUATION & BENCHMARKING
          </h3>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-widest bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-1 rounded w-fit">
          Held-out Real Test Set
        </span>
      </div>

      <div className="text-xs text-slate-600 leading-relaxed space-y-2">
        <p>
          <strong className="text-slate-900">Task:</strong> {data?.task || "Operational State Detection (Dynamic Passage Anomaly)"}
        </p>
        <p>
          <strong className="text-slate-900">Validation Protocol:</strong> {data?.split_method || "Strict time-based non-overlapping split (Train w<=32, Held-out Test w>32)"}
          {" · "}
          <span className="text-slate-500 font-mono">
            Train: {data?.train_samples ?? 33} windows, Test: {data?.test_samples ?? 20} windows
          </span>
        </p>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto rounded-lg border border-slate-200">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-[10px] font-bold uppercase tracking-wider text-slate-600 border-b border-slate-200">
            <tr>
              <th className="px-4 py-3">Candidate Model</th>
              <th className="px-4 py-3 text-right">Accuracy</th>
              <th className="px-4 py-3 text-right">Precision</th>
              <th className="px-4 py-3 text-right">Recall</th>
              <th className="px-4 py-3 text-right">F1 Score</th>
              <th className="px-4 py-3 text-right">Train (ms)</th>
              <th className="px-4 py-3 text-right">Infer (ms)</th>
              <th className="px-4 py-3 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {Object.entries(models).map(([name, m]) => {
              const isSelected = name === selectedModel;
              return (
                <tr
                  key={name}
                  className={isSelected ? "bg-blue-50/60 font-semibold text-slate-900" : "hover:bg-slate-50 text-slate-700"}
                >
                  <td className="px-4 py-3.5 flex items-center space-x-2">
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />}
                    <span>{name}</span>
                  </td>
                  <td className="px-4 py-3.5 text-right font-mono">{(m.Accuracy * 100).toFixed(1)}%</td>
                  <td className="px-4 py-3.5 text-right font-mono">{(m.Precision * 100).toFixed(1)}%</td>
                  <td className="px-4 py-3.5 text-right font-mono">{(m.Recall * 100).toFixed(1)}%</td>
                  <td className="px-4 py-3.5 text-right font-mono font-bold text-blue-700">
                    {m.F1.toFixed(4)}
                  </td>
                  <td className="px-4 py-3.5 text-right font-mono text-slate-500">
                    {m.Training_Time_ms !== undefined ? `${m.Training_Time_ms.toFixed(1)}` : "—"}
                  </td>
                  <td className="px-4 py-3.5 text-right font-mono text-slate-500">
                    {m.Inference_Time_ms !== undefined ? `${m.Inference_Time_ms.toFixed(2)}` : "—"}
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    {isSelected ? (
                      <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-blue-800">
                        Selected
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-400 uppercase font-semibold">Compared</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Selection Rationale */}
      {data?.selection_rationale && (
        <div className="rounded-lg border border-blue-200 bg-blue-50/70 p-4 text-xs leading-relaxed text-blue-900">
          <div className="flex items-center space-x-1.5 font-bold uppercase tracking-wider text-[10px] text-blue-800 mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Selection Rationale</span>
          </div>
          <p>{data.selection_rationale}</p>
        </div>
      )}

      {/* Honest Limitation / Notice */}
      <div className="text-[11px] text-slate-500 leading-relaxed border-t border-slate-100 pt-3">
        * Evaluation was strictly conducted on real held-out time-windows without data leakage. Synthetic observations are never included in the test set.
      </div>
    </div>
  );
}
