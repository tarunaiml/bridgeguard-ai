import { PredictionCard } from "@/components/Dashboard/PredictionCard";
import { FeatureImportance } from "@/components/Charts/FeatureImportance";

export default function PredictionPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white tracking-wide">AI Prediction</h2>
        <p className="text-sm text-gray-400 mt-1">Prototype Random Forest Classification Analysis.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <PredictionCard />
        </div>
        <div>
          <FeatureImportance />
        </div>
      </div>
      
      <div className="bg-[#0B1120] border border-gray-800 rounded-xl p-6 mt-6">
        <h3 className="text-white font-medium uppercase text-sm tracking-wider mb-4">Condition Classes</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gray-800/50 p-4 rounded-lg border-l-4 border-green-500">
            <div className="font-bold text-green-400">HEALTHY</div>
            <div className="text-xs text-gray-400 mt-1">Score: 76-100</div>
            <div className="text-xs text-gray-500 mt-2">Routine operational state with baseline vibration.</div>
          </div>
          <div className="bg-gray-800/50 p-4 rounded-lg border-l-4 border-yellow-500">
            <div className="font-bold text-yellow-400">MINOR DAMAGE</div>
            <div className="text-xs text-gray-400 mt-1">Score: 51-75</div>
            <div className="text-xs text-gray-500 mt-2">Slight deviation in structural response.</div>
          </div>
          <div className="bg-gray-800/50 p-4 rounded-lg border-l-4 border-orange-500">
            <div className="font-bold text-orange-400">MODERATE DAMAGE</div>
            <div className="text-xs text-gray-400 mt-1">Score: 31-50</div>
            <div className="text-xs text-gray-500 mt-2">Noticeable stress and vibration variation.</div>
          </div>
          <div className="bg-gray-800/50 p-4 rounded-lg border-l-4 border-red-500">
            <div className="font-bold text-red-500">SEVERE DAMAGE</div>
            <div className="text-xs text-gray-400 mt-1">Score: 0-30</div>
            <div className="text-xs text-gray-500 mt-2">Critical failure risk or excessive tilt.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
