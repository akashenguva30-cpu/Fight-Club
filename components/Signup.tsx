import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../services/AuthContext';
import { UserRole } from '../types';

const Signup: React.FC = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>(UserRole.NURSE);

  const handle = (e: React.FormEvent) => {
    e.preventDefault();
    signup({ name, email, password, role });
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <form onSubmit={handle} className="w-full max-w-md bg-white p-8 rounded-3xl shadow">
        <h2 className="text-2xl font-bold mb-4">Create account</h2>
        <label className="block text-xs font-bold text-gray-400 uppercase">Name</label>
        <input className="w-full p-3 rounded-xl border border-gray-200 mb-3" value={name} onChange={(e) => setName(e.target.value)} />
        <label className="block text-xs font-bold text-gray-400 uppercase">Email</label>
        <input className="w-full p-3 rounded-xl border border-gray-200 mb-3" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label className="block text-xs font-bold text-gray-400 uppercase">Password</label>
        <input type="password" className="w-full p-3 rounded-xl border border-gray-200 mb-3" value={password} onChange={(e) => setPassword(e.target.value)} />
        <label className="block text-xs font-bold text-gray-400 uppercase">Role</label>
        <select value={role} onChange={(e) => setRole(e.target.value as any)} className="w-full p-3 rounded-xl border border-gray-200 mb-4">
          <option value={UserRole.DOCTOR}>Doctor</option>
          <option value={UserRole.NURSE}>Nurse</option>
          <option value={UserRole.LAB}>Lab Technician</option>
          <option value={UserRole.ADMIN}>Admin</option>
        </select>
        <div className="flex justify-between items-center">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-xl">Sign up</button>
          <a className="text-sm text-gray-500 hover:underline" href="#/login">Sign in</a>
        </div>
      </form>
    </div>
  );
};

export default Signup;