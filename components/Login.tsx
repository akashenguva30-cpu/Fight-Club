import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../services/AuthContext';

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handle = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = login(email, password);
    if (!ok) return setError('Invalid credentials');
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <form onSubmit={handle} className="w-full max-w-md bg-white p-8 rounded-3xl shadow">
        <h2 className="text-2xl font-bold mb-4">Sign in</h2>
        {error && <div className="text-red-600 mb-2">{error}</div>}
        <label className="block text-xs font-bold text-gray-400 uppercase">Email</label>
        <input className="w-full p-3 rounded-xl border border-gray-200 mb-3" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label className="block text-xs font-bold text-gray-400 uppercase">Password</label>
        <input type="password" className="w-full p-3 rounded-xl border border-gray-200 mb-4" value={password} onChange={(e) => setPassword(e.target.value)} />
        <div className="flex justify-between items-center">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-xl">Sign in</button>
          <a className="text-sm text-gray-500 hover:underline" href="#/signup">Create account</a>
        </div>
      </form>
    </div>
  );
};

export default Login;