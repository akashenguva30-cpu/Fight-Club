import React, { useEffect, useState } from 'react';
import { stateService } from '../services/stateService';
import { Bill, Patient } from '../types';
import { IconPlus, IconSearch, IconClipboard } from './Icons';

const emptyService = () => ({ name: '', amount: 0 });

export const Billing = () => {
  const [bills, setBills] = useState<Bill[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [filter, setFilter] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Bill | null>(null);

  useEffect(() => {
    setBills(stateService.getBills());
    setPatients(stateService.getPatients());
    const unsub = stateService.subscribe(() => {
      setBills(stateService.getBills());
      setPatients(stateService.getPatients());
    });
    return unsub;
  }, []);

  const filtered = bills.filter(b =>
    b.patientName.toLowerCase().includes(filter.toLowerCase()) ||
    b.id.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center space-x-3">
            <IconClipboard className="w-6 h-6 text-blue-600" />
            <span>Billing</span>
          </h1>
          <p className="text-gray-500">Manage invoices and payments</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <IconSearch className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Search bills or patient..." className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl w-72 focus:outline-none focus:ring-2 focus:ring-blue-100 transition shadow-sm" />
          </div>
          <button onClick={() => { setEditing(null); setShowModal(true); }} className="bg-blue-600 text-white px-4 py-2 rounded-xl flex items-center space-x-2 hover:bg-blue-700 transition">
            <IconPlus className="w-4 h-4" />
            <span className="font-medium">New Bill</span>
          </button>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 font-medium text-gray-600">Bill ID</th>
              <th className="p-3 font-medium text-gray-600">Patient</th>
              <th className="p-3 font-medium text-gray-600">Services</th>
              <th className="p-3 font-medium text-gray-600">Total</th>
              <th className="p-3 font-medium text-gray-600">Paid</th>
              <th className="p-3 font-medium text-gray-600">Due</th>
              <th className="p-3 font-medium text-gray-600">Status</th>
              <th className="p-3 font-medium text-gray-600">Date</th>
              <th className="p-3 font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(b => (
              <tr key={b.id} className="border-t border-gray-100 hover:bg-gray-50">
                <td className="p-3 font-mono text-xs text-gray-600">{b.id}</td>
                <td className="p-3">{b.patientName} <div className="text-xs text-gray-400">{b.patientId}</div></td>
                <td className="p-3">
                  <div className="text-sm text-gray-700">
                    {b.services.map(s => s.name).join(', ')}
                  </div>
                </td>
                <td className="p-3">${b.totalAmount.toFixed(2)}</td>
                <td className="p-3">${b.paidAmount.toFixed(2)}</td>
                <td className="p-3">${b.dueAmount.toFixed(2)}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${b.status === 'Paid' ? 'bg-green-100 text-green-700' : b.status === 'Pending' ? 'bg-gray-100 text-gray-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {b.status}
                  </span>
                </td>
                <td className="p-3 text-sm text-gray-500">{new Date(b.date).toLocaleDateString()}</td>
                <td className="p-3">
                  <div className="flex items-center space-x-2">
                    <button onClick={() => { setEditing(b); setShowModal(true); }} className="px-3 py-1 text-sm bg-blue-50 text-blue-700 rounded-lg">View</button>
                    <button onClick={() => { setEditing(b); setShowModal(true); }} className="px-3 py-1 text-sm bg-yellow-50 text-yellow-700 rounded-lg">Edit</button>
                    <button onClick={() => { if (confirm('Delete this bill?')) stateService.deleteBill(b.id); }} className="px-3 py-1 text-sm bg-red-50 text-red-600 rounded-lg">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={9} className="p-8 text-center text-gray-400">No bills found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <BillingModal patients={patients} initial={editing} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

const BillingModal = ({ patients, initial, onClose }: { patients: Patient[]; initial: Bill | null; onClose: () => void }) => {
  const [patientId, setPatientId] = useState(initial?.patientId ?? (patients[0]?.id ?? ''));
  const [services, setServices] = useState<{ name: string; amount: number }[]>(initial?.services ?? [emptyService()]);
  const [paidAmount, setPaidAmount] = useState<number>(initial?.paidAmount ?? 0);
  const [date, setDate] = useState(initial?.date ? new Date(initial.date).toISOString().slice(0,10) : new Date().toISOString().slice(0,10));
  const [notes, setNotes] = useState(initial?.notes ?? '');

  useEffect(() => {
    if (!initial && patients.length > 0) setPatientId(patients[0].id);
  }, [initial, patients]);

  const total = services.reduce((s, it) => s + (Number(it.amount) || 0), 0);
  const due = Math.max(0, total - paidAmount);
  const patientName = patients.find(p => p.id === patientId)?.name ?? '';

  const handleSave = () => {
    const payload = {
      patientId,
      patientName,
      services,
      totalAmount: total,
      paidAmount,
      date: new Date(date).toISOString(),
      notes,
      status: paidAmount >= total ? 'Paid' : paidAmount === 0 ? 'Pending' : 'Partial'
    } as any;

    if (initial) {
      stateService.updateBill(initial.id, payload);
    } else {
      stateService.addBill(payload);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/40">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl p-6 overflow-y-auto max-h-[90vh]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{initial ? 'Bill Details' : 'New Bill'}</h2>
          <div className="space-x-2">
            <button onClick={() => onClose()} className="px-3 py-1 rounded-lg bg-gray-100">Close</button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Patient</label>
            <select value={patientId} onChange={(e) => setPatientId(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3">
              {patients.map(p => <option key={p.id} value={p.id}>{p.name} • {p.id}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Date</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3" />
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-bold text-gray-600 uppercase">Services</div>
            <button onClick={() => setServices(s => [...s, emptyService()])} className="text-sm text-blue-600">Add service</button>
          </div>

          <div className="space-y-2">
            {services.map((s, idx) => (
              <div key={idx} className="grid grid-cols-12 gap-2 items-center">
                <input value={s.name} onChange={(e) => { const v = e.target.value; setServices(prev => prev.map((x,i) => i===idx?{...x,name:v}:x)); }} placeholder="Service name" className="col-span-7 bg-gray-50 border border-gray-200 rounded-xl p-2" />
                <input type="number" value={s.amount} onChange={(e) => { const v = Number(e.target.value || 0); setServices(prev => prev.map((x,i) => i===idx?{...x,amount:v}:x)); }} placeholder="Amount" className="col-span-3 bg-gray-50 border border-gray-200 rounded-xl p-2" />
                <div className="col-span-2">
                  <button onClick={() => setServices(prev => prev.filter((_,i) => i !== idx))} className="px-3 py-1 bg-red-50 text-red-600 rounded-lg">Remove</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-4">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Total</label>
            <div className="text-lg font-bold">${total.toFixed(2)}</div>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Paid</label>
            <input type="number" value={paidAmount} onChange={(e) => setPaidAmount(Number(e.target.value || 0))} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Due</label>
            <div className="text-lg font-bold">${due.toFixed(2)}</div>
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Notes</label>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3" />
        </div>

        <div className="flex gap-3 justify-end pt-6">
          {initial && (
            <button onClick={() => { if (initial && confirm('Delete this bill?')) { stateService.deleteBill(initial.id); onClose(); } }} className="px-4 py-2 bg-red-50 text-red-600 rounded-xl">Delete</button>
          )}
          <button onClick={onClose} className="px-4 py-2 bg-gray-100 rounded-xl">Cancel</button>
          <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded-xl">Save</button>
        </div>
      </div>
    </div>
  );
};

export default Billing;
