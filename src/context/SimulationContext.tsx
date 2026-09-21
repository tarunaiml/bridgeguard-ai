"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ConditionClass, SensorData, BridgeHealth } from '../types/bridge';
import { generateSimulatedData } from '../lib/simulation';
import { calculateHealthScore } from '../lib/healthScore';

interface SimulationContextType {
  isRunning: boolean;
  setIsRunning: (val: boolean) => void;
  condition: ConditionClass;
  setCondition: (val: ConditionClass) => void;
  currentData: SensorData | null;
  health: BridgeHealth | null;
  history: SensorData[];
}

const SimulationContext = createContext<SimulationContextType | undefined>(undefined);

export const SimulationProvider = ({ children }: { children: ReactNode }) => {
  const [isRunning, setIsRunning] = useState(true);
  const [condition, setCondition] = useState<ConditionClass>('HEALTHY');
  const [currentData, setCurrentData] = useState<SensorData | null>(null);
  const [health, setHealth] = useState<BridgeHealth | null>(null);
  const [history, setHistory] = useState<SensorData[]>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning) {
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
      }, 1000); // update every second
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, condition, currentData]);

  return (
    <SimulationContext.Provider value={{ isRunning, setIsRunning, condition, setCondition, currentData, health, history }}>
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
