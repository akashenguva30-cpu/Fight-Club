import React, { createContext, useContext, useEffect, useState } from 'react';

export interface Vitals {
  id: string;
  patientId: string;
  heartRate?: number;
  bp?: string;
  temperature?: number;
  oxygen?: number;
  notes?: string;
  updatedBy?: string;
  time: string;
}

const VITALS_KEY = 'careflow_vitals';

const VitalsContext = createContext<any>(null);

export const VitalsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [vitals, setVitals] = useState<Vitals[]>(() => {
    try { const raw = localStorage.getItem(VITALS_KEY); return raw ? JSON.parse(raw) : []; } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem(VITALS_KEY, JSON.stringify(vitals));
  }, [vitals]);

  const addVitals = (v: Omit<Vitals, 'id' | 'time'> & { time?: string }) => {
    const newV: Vitals = { ...v, id: `v-${Date.now()}`, time: v.time ?? new Date().toISOString() };
    setVitals(prev => [...prev, newV]);
    return newV;
  };

  const getLatestByPatient = (patientId: string) => {
    const list = vitals.filter(v => v.patientId === patientId).sort((a,b) => new Date(b.time).getTime() - new Date(a.time).getTime());
    return list[0] ?? null;
  };

  return (
    <VitalsContext.Provider value={{ vitals, addVitals, getLatestByPatient }}>
      {children}
    </VitalsContext.Provider>
  );
};

export const useVitals = () => {
  const ctx = useContext(VitalsContext);
  if (!ctx) throw new Error('useVitals must be used within VitalsProvider');
  return ctx;
};

export default VitalsContext;
