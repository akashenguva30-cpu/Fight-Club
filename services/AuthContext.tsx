import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, UserRole } from '../types';
import { CURRENT_USER_KEY } from '../constants';

const USERS_KEY = 'careflow_users';

interface AuthContextValue {
  user: User | null;
  login: (email: string, password: string) => boolean;
  signup: (u: { name: string; email: string; password: string; role: UserRole }) => User;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const readUsers = (): any[] => {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
};

const writeUsers = (users: any[]) => localStorage.setItem(USERS_KEY, JSON.stringify(users));

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const raw = localStorage.getItem(CURRENT_USER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  });

  useEffect(() => {
    if (!localStorage.getItem(USERS_KEY)) {
      writeUsers([]);
    }
  }, []);

  const login = (email: string, password: string) => {
    const users = readUsers();
    const found = users.find(u => u.email === email && u.password === password);
    if (found) {
      const safeUser: User = { id: found.id, name: found.name, role: found.role };
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(safeUser));
      setUser(safeUser);
      return true;
    }
    return false;
  };

  const signup = (u: { name: string; email: string; password: string; role: UserRole }) => {
    const users = readUsers();
    const id = `u-${Date.now()}`;
    const newUser = { id, name: u.name, email: u.email, password: u.password, role: u.role };
    users.push(newUser);
    writeUsers(users);
    const safeUser: User = { id, name: u.name, role: u.role };
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(safeUser));
    setUser(safeUser);
    return safeUser;
  };

  const logout = () => {
    localStorage.removeItem(CURRENT_USER_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export default AuthContext;
