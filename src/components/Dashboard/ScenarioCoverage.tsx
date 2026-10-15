"use client";

import { useEffect, useState } from "react";
import { Grid, Layers, Database, ShieldAlert, Sparkles, CheckCircle } from "lucide-react";

type CoverageSummary = {
  total_scenarios: number;
  real_data_scenarios: number;
  synthetic_data_scenarios: number;
  both_real_and_synthetic: number;
  uncalibrated_insufficient_evidence: number;
  calibrated_percentage: number;
};

type ScenarioItem = {
  scenario_id: string;
  bridge_type: string;
  traffic_level: string;
  environmental_condition: string;
  coverage_status: string;
  calibration_status: string;
  sample_count_real: number;
  sample_count_synthetic: number;
};

export function ScenarioCoverage() {
  const [summary, setSummary] = useState<CoverageSummary | null>(null);
  const [scenarios, setScenarios] = useState<ScenarioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    fetch("/api/scenarios-coverage")
      .then((res) => res.json())
      .then((data) => {
        if (data.summary) {
          setSummary(data.summary);
          setScenarios(data.scenarios || []);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load scenario coverage:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm animate-pulse">
        <div className="h-6 w-56 bg-slate-200 rounded mb-4"></div>
        <div className="h-28 bg-slate-100 rounded"></div>
      </div>
    );
  }

  const filteredScenarios = scenarios.filter((s) => {
    if (filter === "calibrated") return s.coverage_status !== "uncalibrated";
    if (filter === "real") return s.sample_count_real > 0;
    if (filter === "uncalibrated") return s.coverage_status === "uncalibrated";
    return true;
  });

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E2E8F0] gap-2">
        <div className="flex items-center space-x-2">
          <Grid className="w-5 h-5 text-[#2563EB]" />
          <h3 className="text-[#111827] font-bold uppercase text-xs tracking-widest">
            132-SCENARIO MATRIX & STATISTICAL COVERAGE
          </h3>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-widest bg-slate-100 text-slate-700 border border-slate-200 px-2.5 py-1 rounded w-fit">
          11 Bridge Types × 3 Traffic × 4 Environments
        </span>
      </div>

      {/* Coverage KPI Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 flex flex-col justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Total Scenarios</span>
          <span className="text-2xl font-bold text-slate-900 mt-1">{summary?.total_scenarios ?? 132}</span>
          <span className="text-[10px] text-slate-500 mt-1">Combinatorial matrix</span>
        </div>

        <div className="bg-emerald-50/70 border border-emerald-200 rounded-lg p-4 flex flex-col justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">Real Data Anchors</span>
          <span className="text-2xl font-bold text-emerald-700 mt-1">{summary?.real_data_scenarios ?? 2}</span>
          <span className="text-[10px] text-emerald-700 mt-1">Ponneri Bridge observations</span>
        </div>

        <div className="bg-blue-50/70 border border-blue-200 rounded-lg p-4 flex flex-col justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-800">Calibrated Synthetic</span>
          <span className="text-2xl font-bold text-blue-700 mt-1">{summary?.synthetic_data_scenarios ?? 12}</span>
          <span className="text-[10px] text-blue-700 mt-1">Covariance-preserving Gaussian</span>
        </div>

        <div className="bg-amber-50/70 border border-amber-200 rounded-lg p-4 flex flex-col justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">Uncalibrated (Documented)</span>
          <span className="text-2xl font-bold text-amber-700 mt-1">{summary?.uncalibrated_insufficient_evidence ?? 120}</span>
          <span className="text-[10px] text-amber-700 mt-1">Insufficient empirical prior</span>
        </div>
      </div>

      {/* Methodology & Traceability Explanations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="rounded-lg border border-slate-200 bg-slate-50/60 p-4 space-y-2">
          <div className="flex items-center space-x-1.5 font-bold uppercase text-[10px] tracking-wider text-slate-800">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>Gaussian Generative Methodology</span>
          </div>
          <p className="text-slate-600 leading-relaxed">
            Synthetic observations are drawn from multivariate normal distributions: <span className="font-mono text-slate-800 font-semibold">X ~ N(μ, Σ)</span>. 
            Covariance matrices estimated from real Ponneri vibration data preserve realistic inter-channel accelerometer correlations. Physical non-negativity bounds (RMS ≥ 0, Peak ≥ 0, Variance ≥ 0) are strictly enforced.
          </p>
        </div>

        <div className="rounded-lg border border-slate-200 bg-slate-50/60 p-4 space-y-2">
          <div className="flex items-center space-x-1.5 font-bold uppercase text-[10px] tracking-wider text-slate-800">
            <ShieldAlert className="w-4 h-4 text-amber-600" />
            <span>Provenance & Anti-Leakage Guarantee</span>
          </div>
          <p className="text-slate-600 leading-relaxed">
            Every synthetic row records full provenance (<span className="font-mono text-slate-700">data_origin: synthetic</span>, seed, reference means). 
            Synthetic data is <strong className="text-slate-900">strictly excluded</strong> from the held-out real-world test set to prevent artificial metric inflation.
          </p>
        </div>
      </div>

      {/* Filter Tabs & Preview */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600">
            Scenario Inventory ({filteredScenarios.length} shown)
          </span>
          <div className="flex space-x-1">
            {[
              { id: "all", label: "All (132)" },
              { id: "calibrated", label: "Calibrated (12)" },
              { id: "real", label: "Real Anchors (2)" },
              { id: "uncalibrated", label: "Uncalibrated (120)" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded transition ${
                  filter === tab.id
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="max-h-48 overflow-y-auto rounded-lg border border-slate-200 text-xs">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-[10px] font-bold uppercase text-slate-500 sticky top-0 border-b border-slate-200">
              <tr>
                <th className="px-3 py-2">ID</th>
                <th className="px-3 py-2">Bridge Type</th>
                <th className="px-3 py-2">Traffic</th>
                <th className="px-3 py-2">Environment</th>
                <th className="px-3 py-2">Real</th>
                <th className="px-3 py-2">Synthetic</th>
                <th className="px-3 py-2">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredScenarios.slice(0, 30).map((s) => (
                <tr key={s.scenario_id} className="hover:bg-slate-50">
                  <td className="px-3 py-2 font-mono text-slate-500">{s.scenario_id}</td>
                  <td className="px-3 py-2 font-medium text-slate-900">{s.bridge_type}</td>
                  <td className="px-3 py-2 text-slate-600">{s.traffic_level}</td>
                  <td className="px-3 py-2 text-slate-600">{s.environmental_condition}</td>
                  <td className="px-3 py-2 font-mono">{s.sample_count_real}</td>
                  <td className="px-3 py-2 font-mono">{s.sample_count_synthetic}</td>
                  <td className="px-3 py-2">
                    <span
                      className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${
                        s.coverage_status === "both"
                          ? "bg-emerald-100 text-emerald-800"
                          : s.coverage_status === "synthetic_data"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {s.calibration_status.replace(/_/g, " ")}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
