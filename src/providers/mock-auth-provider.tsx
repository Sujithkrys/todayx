'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface User {
  fullName: string;
  email: string;
  imageUrl?: string;
  firstName?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function MockAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Restore session on load
    const storedUser = localStorage.getItem('dummy_user');
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser(parsed);
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  // Simple client-side route guard logic
  useEffect(() => {
    if (isLoading) return;

    const isAuthRoute = pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up');
    const isDashboardRoute = pathname.startsWith('/dashboard') || pathname === '/';

    if (!isAuthenticated && isDashboardRoute) {
      router.replace('/sign-in');
    } else if (isAuthenticated && isAuthRoute) {
      router.replace('/dashboard');
    }
  }, [isAuthenticated, pathname, isLoading, router]);

  const signIn = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Simple test credentials
    if (email === 'admin@example.com' && password === 'password123') {
      const dummyUser: User = {
        fullName: 'Pavan Kumar',
        firstName: 'Pavan',
        email: 'admin@example.com',
      };
      localStorage.setItem('dummy_user', JSON.stringify(dummyUser));
      setUser(dummyUser);
      setIsAuthenticated(true);
      setIsLoading(false);
      router.replace('/dashboard');
      return true;
    }

    setIsLoading(false);
    return false;
  };

  const signOut = async () => {
    localStorage.removeItem('dummy_user');
    setUser(null);
    setIsAuthenticated(false);
    router.replace('/sign-in');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useMockAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useMockAuth must be used within a MockAuthProvider');
  }
  return context;
}
