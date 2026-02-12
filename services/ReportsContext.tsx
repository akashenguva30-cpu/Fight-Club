import React, { createContext, useContext, useEffect, useState } from 'react';
import { Bill } from '../types';

export interface Report {
  id: string;
  patientId: string;
  uploadedBy: string;
  reportName: string;
  fileUrl: string;
  notes?: string;
  date: string;
}

const REPORTS_KEY = 'careflow_reports';

const ReportsContext = createContext<any>(null);

export const ReportsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [reports, setReports] = useState<Report[]>(() => {
    try { const raw = localStorage.getItem(REPORTS_KEY); return raw ? JSON.parse(raw) : []; } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem(REPORTS_KEY, JSON.stringify(reports));
  }, [reports]);

  const addReport = (r: Omit<Report, 'id' | 'date'> & { fileUrl: string }) => {
    const newR: Report = { ...r, id: `r-${Date.now()}`, date: new Date().toISOString() };
    setReports(prev => [...prev, newR]);
    return newR;
  };

  const deleteReport = (id: string) => setReports(prev => prev.filter(p => p.id !== id));

  return (
    <ReportsContext.Provider value={{ reports, addReport, deleteReport }}>
      {children}
    </ReportsContext.Provider>
  );
};

export const useReports = () => {
  const ctx = useContext(ReportsContext);
  if (!ctx) throw new Error('useReports must be used within ReportsProvider');
  return ctx;
};

export default ReportsContext;
