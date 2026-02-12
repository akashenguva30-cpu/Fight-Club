import React, { useState } from 'react';
import { useReports } from '../services/ReportsContext';
import { useAuth } from '../services/AuthContext';
import { stateService } from '../services/stateService';

const LabUpload: React.FC = () => {
  const { addReport, reports } = useReports();
  const { user } = useAuth();
  const patients = stateService.getPatients();

  const [patientId, setPatientId] = useState(patients[0]?.id ?? '');
  const [reportName, setReportName] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [notes, setNotes] = useState('');

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files && e.target.files[0];
    if (f) setFile(f);
  };

  const handle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert('Please select a file');
    const url = URL.createObjectURL(file);
    addReport({ patientId, uploadedBy: user?.id ?? 'unknown', reportName, fileUrl: url, notes });
    setReportName(''); setFile(null); setNotes('');
    alert('Report added (mock)');
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h2 className="text-xl font-bold mb-4">Upload Lab Report</h2>
      <form onSubmit={handle} className="bg-white p-6 rounded-2xl border border-gray-100">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-400 uppercase mb-1">Patient</label>
            <select value={patientId} onChange={(e) => setPatientId(e.target.value)} className="w-full p-3 rounded-xl border border-gray-200">
              {patients.map(p => <option key={p.id} value={p.id}>{p.name} • {p.id}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-400 uppercase mb-1">Report Name</label>
            <input value={reportName} onChange={(e) => setReportName(e.target.value)} className="w-full p-3 rounded-xl border border-gray-200" />
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-xs text-gray-400 uppercase mb-1">File</label>
          <input type="file" accept="application/pdf,image/*" onChange={handleFile} />
        </div>
        <div className="mt-4">
          <label className="block text-xs text-gray-400 uppercase mb-1">Notes</label>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full p-3 rounded-xl border border-gray-200" />
        </div>
        <div className="mt-4 text-right">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-xl">Upload</button>
        </div>
      </form>

      <div className="mt-8">
        <h3 className="font-bold mb-2">All Reports</h3>
        <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3">Report</th>
                <th className="p-3">Patient</th>
                <th className="p-3">By</th>
                <th className="p-3">Date</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map(r => (
                <tr key={r.id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="p-3">{r.reportName}</td>
                  <td className="p-3">{patients.find(p => p.id === r.patientId)?.name ?? r.patientId}</td>
                  <td className="p-3">{r.uploadedBy}</td>
                  <td className="p-3">{new Date(r.date).toLocaleString()}</td>
                  <td className="p-3"><a className="text-blue-600 hover:underline" href={r.fileUrl} target="_blank" rel="noreferrer">View</a></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LabUpload;