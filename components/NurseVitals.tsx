import React, { useState } from 'react';
import { useVitals } from '../services/VitalsContext';
import { stateService } from '../services/stateService';
import { useAuth } from '../services/AuthContext';

const NurseVitals: React.FC = () => {
  const { addVitals } = useVitals();
  const { user } = useAuth();
  const patients = stateService.getPatients();
  const [patientId, setPatientId] = useState(patients[0]?.id ?? '');
  const [heartRate, setHeartRate] = useState<number | ''>('');
  const [bp, setBp] = useState('');
  const [temp, setTemp] = useState<number | ''>('');
  const [oxygen, setOxygen] = useState<number | ''>('');
  const [notes, setNotes] = useState('');

  const handle = (e: React.FormEvent) => {
    e.preventDefault();
    addVitals({ patientId, heartRate: Number(heartRate) || undefined, bp, temperature: Number(temp) || undefined, oxygen: Number(oxygen) || undefined, notes, updatedBy: user?.id });
    setHeartRate(''); setBp(''); setTemp(''); setOxygen(''); setNotes('');
    alert('Vitals saved');
  };

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h2 className="text-xl font-bold mb-4">Nurse — Update Vitals</h2>
      <form onSubmit={handle} className="bg-white p-6 rounded-2xl border border-gray-100">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-400 uppercase mb-1">Patient</label>
            <select value={patientId} onChange={(e) => setPatientId(e.target.value)} className="w-full p-3 rounded-xl border border-gray-200">
              {patients.map(p => <option key={p.id} value={p.id}>{p.name} • {p.id}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-400 uppercase mb-1">BP</label>
            <input value={bp} onChange={(e) => setBp(e.target.value)} className="w-full p-3 rounded-xl border border-gray-200" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div>
            <label className="block text-xs text-gray-400 uppercase mb-1">Heart Rate</label>
            <input type="number" value={heartRate} onChange={(e) => setHeartRate(e.target.value === '' ? '' : Number(e.target.value))} className="w-full p-3 rounded-xl border border-gray-200" />
          </div>
          <div>
            <label className="block text-xs text-gray-400 uppercase mb-1">Temperature</label>
            <input type="number" value={temp} onChange={(e) => setTemp(e.target.value === '' ? '' : Number(e.target.value))} className="w-full p-3 rounded-xl border border-gray-200" />
          </div>
          <div>
            <label className="block text-xs text-gray-400 uppercase mb-1">Oxygen</label>
            <input type="number" value={oxygen} onChange={(e) => setOxygen(e.target.value === '' ? '' : Number(e.target.value))} className="w-full p-3 rounded-xl border border-gray-200" />
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-xs text-gray-400 uppercase mb-1">Notes</label>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full p-3 rounded-xl border border-gray-200" />
        </div>
        <div className="mt-4 text-right">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-xl">Save Vitals</button>
        </div>
      </form>
    </div>
  );
};

export default NurseVitals;
