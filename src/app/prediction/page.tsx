import { PredictionCard } from "@/components/Dashboard/PredictionCard";
import { FeatureImportance } from "@/components/Charts/FeatureImportance";

export default function PredictionPage() {
  return (
    <div className="space-y-8 pb-12">
      <div>
        <h2 className="text-3xl font-black text-white tracking-tighter mb-2">AI CONDITION PREDICTION</h2>
        <p className="text-sm font-bold text-slate-400 tracking-widest uppercase mt-1">Prototype Random Forest Classification Analysis.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <PredictionCard />
        </div>
        <div>
          <FeatureImportance />
        </div>
      </div>
      
      <div className="bg-[#0D1422] border border-slate-800 rounded-2xl p-6 mt-6 shadow-sm">
        <h3 className="text-white font-bold uppercase text-xs tracking-widest mb-6">Condition Classes</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-slate-900/50 p-5 rounded-xl border-t-4 border-t-green-500 border border-slate-800">
            <div className="font-black text-green-400 tracking-widest uppercase">HEALTHY</div>
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Score: 76-100</div>
            <div className="text-xs text-slate-400 mt-3 font-medium">Routine operational state with baseline vibration.</div>
          </div>
          <div className="bg-slate-900/50 p-5 rounded-xl border-t-4 border-t-amber-500 border border-slate-800">
            <div className="font-black text-amber-500 tracking-widest uppercase">MINOR DAMAGE</div>
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Score: 51-75</div>
            <div className="text-xs text-slate-400 mt-3 font-medium">Slight deviation in structural response.</div>
          </div>
          <div className="bg-slate-900/50 p-5 rounded-xl border-t-4 border-t-orange-500 border border-slate-800">
            <div className="font-black text-orange-500 tracking-widest uppercase">MODERATE</div>
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Score: 31-50</div>
            <div className="text-xs text-slate-400 mt-3 font-medium">Noticeable stress and vibration variation.</div>
          </div>
          <div className="bg-slate-900/50 p-5 rounded-xl border-t-4 border-t-red-500 border border-slate-800">
            <div className="font-black text-red-500 tracking-widest uppercase">SEVERE</div>
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Score: 0-30</div>
            <div className="text-xs text-slate-400 mt-3 font-medium">Critical failure risk or excessive tilt.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
