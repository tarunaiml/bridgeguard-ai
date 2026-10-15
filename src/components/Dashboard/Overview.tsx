"use client";

import { Activity, Pause, Play, ShieldCheck, TriangleAlert } from "lucide-react";
import { useSimulation } from "@/context/SimulationContext";
import clsx from "clsx";

export function Overview() {
  const { currentData, health, isRunning, mode, setIsRunning } = useSimulation();
  const score = health?.score;
  const alert = health && health.condition !== "HEALTHY";
  const stateLabel = mode === "SIMULATION" ? "Simulation feed" : "Manual assessment";

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="grid lg:grid-cols-[1.35fr_.65fr]">
        <div className="p-6 sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
              <Activity className="h-4 w-4 text-blue-600" /> Current structural state
            </div>
            <span className={clsx("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold", isRunning ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-amber-200 bg-amber-50 text-amber-700")}>
              <span className={clsx("h-1.5 w-1.5 rounded-full", isRunning ? "bg-emerald-500" : "bg-amber-500")} />
              {isRunning ? "Updating" : "Paused"}
            </span>
          </div>
          {health ? (
            <>
              <div className="mt-7 flex items-end gap-4">
                <span className={clsx("text-5xl font-semibold tracking-tight", alert ? "text-amber-600" : "text-emerald-600")}>{score}</span>
                <span className="pb-1 text-sm text-slate-500">health score / 100</span>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <span className={clsx("inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold", alert ? "bg-amber-50 text-amber-800" : "bg-emerald-50 text-emerald-800")}>
                  {alert ? <TriangleAlert className="h-4 w-4" /> : <ShieldCheck className="h-4 w-4" />}
                  {health.condition}
                </span>
                <span className="text-xs text-slate-500">{stateLabel} · {currentData?.timestamp ?? "Awaiting first reading"}</span>
              </div>
              <p className="mt-5 max-w-2xl text-sm leading-6 text-slate-600">{health.recommendation.replace("Prototype Recommendation: ", "")}</p>
            </>
          ) : (
            <div className="mt-7 animate-pulse space-y-3"><div className="h-12 w-36 rounded bg-slate-100" /><div className="h-4 w-2/3 rounded bg-slate-100" /></div>
          )}
        </div>
        <div className="border-t border-slate-200 bg-slate-50 p-6 lg:border-l lg:border-t-0">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">Feed control</p>
          <p className="mt-3 text-sm leading-6 text-slate-600">Pause the simulated feed to inspect the current reading, or continue streaming updates.</p>
          <button onClick={() => setIsRunning(!isRunning)} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 transition hover:border-blue-300 hover:text-blue-700">
            {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            {isRunning ? "Pause feed" : "Resume feed"}
          </button>
          <p className="mt-3 text-[11px] leading-5 text-slate-500">Values are simulated unless Manual input is selected.</p>
        </div>
      </div>
    </section>
  );
}
