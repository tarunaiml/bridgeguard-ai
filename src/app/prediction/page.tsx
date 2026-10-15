import { PredictionCard } from "@/components/Dashboard/PredictionCard";
import { ShapExplanation } from "@/components/Dashboard/ShapExplanation";
import { PageIntro } from "@/components/Layout/PageIntro";

export default function PredictionPage() {
  return (
    <div className="mx-auto max-w-[1100px] space-y-6 pb-12">
      <PageIntro eyebrow="Model output" title="Condition prediction" description="Model results and explanations appear only when the ML backend and a trained model are available." />
      <PredictionCard />
      <ShapExplanation />
      
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="mb-6 text-sm font-semibold text-slate-950">Prototype health-score bands</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="rounded-xl border border-slate-200 border-t-4 border-t-emerald-500 bg-white p-5">
            <div className="font-bold tracking-wide text-emerald-700">HEALTHY</div><div className="mt-1 text-[10px] font-bold uppercase tracking-widest text-slate-500">Score: 76–100</div><div className="mt-3 text-xs text-slate-600">Routine operational state with baseline vibration.</div>
          </div>
          <div className="rounded-xl border border-slate-200 border-t-4 border-t-amber-500 bg-white p-5">
            <div className="font-bold tracking-wide text-amber-700">MINOR DAMAGE</div><div className="mt-1 text-[10px] font-bold uppercase tracking-widest text-slate-500">Score: 51–75</div><div className="mt-3 text-xs text-slate-600">Slight deviation in structural response.</div>
          </div>
          <div className="rounded-xl border border-slate-200 border-t-4 border-t-orange-500 bg-white p-5">
            <div className="font-bold tracking-wide text-orange-700">MODERATE</div><div className="mt-1 text-[10px] font-bold uppercase tracking-widest text-slate-500">Score: 31–50</div><div className="mt-3 text-xs text-slate-600">Noticeable stress and vibration variation.</div>
          </div>
          <div className="rounded-xl border border-slate-200 border-t-4 border-t-red-500 bg-white p-5">
            <div className="font-bold tracking-wide text-red-700">SEVERE</div><div className="mt-1 text-[10px] font-bold uppercase tracking-widest text-slate-500">Score: 0–30</div><div className="mt-3 text-xs text-slate-600">Critical prototype threshold or excessive tilt.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
