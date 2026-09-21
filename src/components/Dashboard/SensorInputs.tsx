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

  const fields = [
    { key: 'accelX', label: 'Acceleration X (g)' },
    { key: 'accelY', label: 'Acceleration Y (g)' },
    { key: 'accelZ', label: 'Acceleration Z (g)' },
    { key: 'rms', label: 'RMS Acceleration (g)' },
    { key: 'peakAccel', label: 'Peak Acceleration (g)' },
    { key: 'stdDev', label: 'Standard Deviation' },
    { key: 'dominantFreq', label: 'Dominant Frequency (Hz)' },
    { key: 'tiltX', label: 'Tilt X (°)' },
    { key: 'tiltY', label: 'Tilt Y (°)' },
    { key: 'temperature', label: 'Temperature (°C)' },
    { key: 'humidity', label: 'Humidity (%)' },
    { key: 'stress', label: 'Structural Stress (%)' }
  ];

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-sm mb-8">
      <div className="flex items-center justify-between p-4 border-b border-[#E2E8F0]">
        <div>
          <h3 className="font-bold text-[#111827]">SENSOR INPUTS</h3>
          {mode === 'MANUAL INPUT' && (
            <p className="text-[10px] text-[#64748B] font-bold tracking-widest uppercase mt-0.5">Manual / Prototype Input</p>
          )}
        </div>
        <div className="flex bg-[#F5F7FA] border border-[#E2E8F0] rounded-lg p-1">
          <button
            onClick={() => setMode('SIMULATION')}
            className={clsx(
              "px-4 py-1.5 rounded-md text-xs font-bold transition-colors",
              mode === 'SIMULATION' ? "bg-white text-[#2563EB] shadow-sm border border-[#E2E8F0]" : "text-[#64748B] hover:text-[#111827]"
            )}
          >
            SIMULATION
          </button>
          <button
            onClick={() => setMode('MANUAL INPUT')}
            className={clsx(
              "px-4 py-1.5 rounded-md text-xs font-bold transition-colors",
              mode === 'MANUAL INPUT' ? "bg-white text-[#2563EB] shadow-sm border border-[#E2E8F0]" : "text-[#64748B] hover:text-[#111827]"
            )}
          >
            MANUAL INPUT
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {fields.map(f => (
            <div key={f.key}>
              <label className="block text-xs font-bold text-[#64748B] mb-2">{f.label}</label>
              <input
                type="number"
                step="0.01"
                disabled={mode === 'SIMULATION'}
                value={localData[f.key as keyof typeof localData]}
                onChange={(e) => handleInputChange(f.key, e.target.value)}
                className={clsx(
                  "w-full px-3 py-2 border border-[#E2E8F0] rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-colors",
                  mode === 'SIMULATION' ? "bg-[#F5F7FA] text-[#64748B]" : "bg-white text-[#111827]"
                )}
              />
            </div>
          ))}
        </div>

        {mode === 'MANUAL INPUT' && (
          <div className="mt-6 flex justify-end">
            <button
              onClick={() => calculateManualHealth()}
              className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-6 py-2.5 rounded-lg font-bold text-sm shadow-sm transition-colors"
            >
              CALCULATE HEALTH
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
