import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Role } from '../types';
import { loginUser as apiLogin, logoutUser as apiLogout, signupUser as apiSignup } from '../utils/api';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: Role) => Promise<void>;
  signup: (userData: any) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('apt_user');
    const savedToken = localStorage.getItem('apt_token');
    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role: Role) => {
    const result = await apiLogin(email, password, role);
    setUser(result.user);
    localStorage.setItem('apt_user', JSON.stringify(result.user));
    localStorage.setItem('apt_token', result.accessToken);
  };

  const signup = async (userData: any) => {
    const result = await apiSignup(userData);
    setUser(result.user);
    localStorage.setItem('apt_user', JSON.stringify(result.user));
    localStorage.setItem('apt_token', result.accessToken);
  };

  const logout = async () => {
    try {
      await apiLogout();
    } catch (err) {
      console.error('Logout error', err);
    } finally {
      setUser(null);
      localStorage.removeItem('apt_user');
      localStorage.removeItem('apt_token');
      window.location.href = '/login';
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
