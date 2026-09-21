"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ConditionClass, SensorData, BridgeHealth } from '../types/bridge';
import { generateSimulatedData } from '../lib/simulation';
import { calculateHealthScore } from '../lib/healthScore';

interface SimulationContextType {
  mode: 'SIMULATION' | 'MANUAL INPUT';
  setMode: (mode: 'SIMULATION' | 'MANUAL INPUT') => void;
  isRunning: boolean;
  setIsRunning: (val: boolean) => void;
  condition: ConditionClass;
  setCondition: (val: ConditionClass) => void;
  currentData: SensorData | null;
  health: BridgeHealth | null;
  history: SensorData[];
  updateManualData: (data: Partial<SensorData>) => void;
  calculateManualHealth: (overrideData?: SensorData) => void;
}

const SimulationContext = createContext<SimulationContextType | undefined>(undefined);

export const SimulationProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<'SIMULATION' | 'MANUAL INPUT'>('SIMULATION');
  const [isRunning, setIsRunning] = useState(true);
  const [condition, setCondition] = useState<ConditionClass>('HEALTHY');
  const [currentData, setCurrentData] = useState<SensorData | null>(null);
  const [health, setHealth] = useState<BridgeHealth | null>(null);
  const [history, setHistory] = useState<SensorData[]>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (mode === 'SIMULATION' && isRunning) {
      interval = setInterval(() => {
        const newData = generateSimulatedData(condition, currentData || undefined);
        const newHealth = calculateHealthScore(newData);

        setCurrentData(newData);
        setHealth(newHealth);
        setHistory((prev) => {
          const updated = [...prev, { ...newData, score: newHealth.score }];
          if (updated.length > 50) return updated.slice(updated.length - 50);
          return updated;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [mode, isRunning, condition, currentData]);

  const updateManualData = (data: Partial<SensorData>) => {
    if (currentData) {
      setCurrentData({ ...currentData, ...data });
    }
  };

  const calculateManualHealth = (overrideData?: SensorData) => {
    const dataToUse = overrideData || currentData;
    if (dataToUse) {
      const newHealth = calculateHealthScore(dataToUse);
      setHealth(newHealth);
      setCondition(newHealth.condition);
      
      const now = new Date();
      const newData = { ...dataToUse, timestamp: now.toISOString().substring(11, 19) };
      setCurrentData(newData);

      setHistory((prev) => {
        const updated = [...prev, { ...newData, score: newHealth.score }];
        if (updated.length > 50) return updated.slice(updated.length - 50);
        return updated;
      });
    }
  };

  return (
    <SimulationContext.Provider value={{ 
      mode, setMode, 
      isRunning, setIsRunning, 
      condition, setCondition, 
      currentData, health, history,
      updateManualData, calculateManualHealth
    }}>
      {children}
    </SimulationContext.Provider>
  );
};

export const useSimulation = () => {
  const context = useContext(SimulationContext);
  if (context === undefined) {
    throw new Error('useSimulation must be used within a SimulationProvider');
  }
  return context;
};
