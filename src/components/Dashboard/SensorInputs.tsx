"use client";

import { useSimulation } from '@/context/SimulationContext';
import { useState, useEffect } from 'react';
import clsx from 'clsx';

export function SensorInputs() {
  const { mode, setMode, currentData, updateManualData, calculateManualHealth } = useSimulation();
  
  const [localData, setLocalData] = useState({
    accelX: 0, accelY: 0, accelZ: 0, rms: 0, peakAccel: 0, stdDev: 0, dominantFreq: 0,
    tiltX: 0, tiltY: 0, temperature: 0, humidity: 0, stress: 0
  });

  useEffect(() => {
    if (mode === 'SIMULATION' && currentData) {
      setLocalData({
        accelX: currentData.accelX,
        accelY: currentData.accelY,
        accelZ: currentData.accelZ,
        rms: currentData.rms,
        peakAccel: currentData.peakAccel,
        stdDev: currentData.stdDev,
        dominantFreq: currentData.dominantFreq,
        tiltX: currentData.tiltX,
        tiltY: currentData.tiltY,
        temperature: currentData.temperature,
        humidity: currentData.humidity,
        stress: currentData.stress || 0
      });
    }
  }, [currentData, mode]);

  const handleInputChange = (field: string, value: string) => {
    const num = parseFloat(value) || 0;
    setLocalData(prev => ({ ...prev, [field]: num }));
    updateManualData({ [field]: num });
  };

  const renderField = (key: keyof typeof localData, label: string) => (
    <div key={key} className="flex flex-col">
      <label className="text-[10px] font-bold text-[#64748B] mb-1.5">{label}</label>
      <input
        type="number"
        step="0.01"
        disabled={mode === 'SIMULATION'}
        value={localData[key]}
        onChange={(e) => handleInputChange(key, e.target.value)}
        className={clsx(
          "w-full px-3 py-2 border border-[#E2E8F0] rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-colors",
          mode === 'SIMULATION' ? "bg-[#F5F7FA] text-[#64748B]" : "bg-white text-[#111827]"
        )}
      />
    </div>
  );

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-sm flex flex-col">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-5 border-b border-[#E2E8F0] gap-4">
        <div>
          <h3 className="font-bold text-[#111827] text-sm tracking-wide">SENSOR INPUTS</h3>
        </div>
        <div className="flex bg-[#F5F7FA] border border-[#E2E8F0] rounded-lg p-1 w-full md:w-auto">
          <button
            onClick={() => setMode('SIMULATION')}
            className={clsx(
              "flex-1 md:flex-none px-4 py-1.5 rounded-md text-xs font-bold transition-colors uppercase tracking-widest",
              mode === 'SIMULATION' ? "bg-white text-[#2563EB] shadow-sm border border-[#E2E8F0]" : "text-[#64748B] hover:text-[#111827]"
            )}
          >
            Simulation
          </button>
          <button
            onClick={() => setMode('MANUAL INPUT')}
            className={clsx(
              "flex-1 md:flex-none px-4 py-1.5 rounded-md text-xs font-bold transition-colors uppercase tracking-widest",
              mode === 'MANUAL INPUT' ? "bg-white text-[#2563EB] shadow-sm border border-[#E2E8F0]" : "text-[#64748B] hover:text-[#111827]"
            )}
          >
            Manual Input
          </button>
        </div>
      </div>

      <div className="p-6 bg-[#F5F7FA]">
        <div className="mb-4">
          <h4 className="text-xs font-bold text-[#111827] uppercase tracking-widest flex items-center gap-2">
            {mode === 'SIMULATION' ? 'SIMULATED SENSOR DATA' : 'MANUAL SENSOR DATA'}
            <span className="text-[9px] bg-white border border-[#E2E8F0] text-[#64748B] px-2 py-0.5 rounded tracking-widest uppercase shadow-sm">
              {mode === 'SIMULATION' ? 'Simulation Mode' : 'Manual Mode'}
            </span>
          </h4>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Acceleration Card */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-sm">
            <h5 className="text-[10px] font-bold text-[#2563EB] uppercase tracking-widest mb-4 border-b border-[#F5F7FA] pb-2">Acceleration</h5>
            <div className="grid grid-cols-2 gap-4">
              {renderField('accelX', 'X (g)')}
              {renderField('accelY', 'Y (g)')}
              {renderField('accelZ', 'Z (g)')}
              {renderField('rms', 'RMS (g)')}
              {renderField('peakAccel', 'Peak (g)')}
              {renderField('stdDev', 'Standard Dev')}
            </div>
          </div>

          {/* Structural Card */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-sm">
            <h5 className="text-[10px] font-bold text-[#2563EB] uppercase tracking-widest mb-4 border-b border-[#F5F7FA] pb-2">Structural</h5>
            <div className="grid grid-cols-2 gap-4">
              {renderField('dominantFreq', 'Dominant Freq (Hz)')}
              {renderField('tiltX', 'Tilt X (°)')}
              {renderField('tiltY', 'Tilt Y (°)')}
              {renderField('stress', 'Stress (%)')}
            </div>
          </div>

          {/* Environment Card */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-sm">
            <h5 className="text-[10px] font-bold text-[#2563EB] uppercase tracking-widest mb-4 border-b border-[#F5F7FA] pb-2">Environment</h5>
            <div className="grid grid-cols-2 gap-4">
              {renderField('temperature', 'Temperature (°C)')}
              {renderField('humidity', 'Humidity (%)')}
            </div>
          </div>
        </div>

        {mode === 'MANUAL INPUT' && (
          <div className="mt-6 flex justify-end">
            <button
              onClick={() => calculateManualHealth()}
              className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-8 py-3 rounded-lg font-bold text-sm shadow-sm transition-colors uppercase tracking-widest"
            >
              Calculate Health
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
