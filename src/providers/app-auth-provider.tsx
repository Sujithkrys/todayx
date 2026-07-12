'use client';

import React, { createContext, useContext } from 'react';
import { useMockAuth } from './mock-auth-provider';

interface AppUser {
  fullName: string | null;
  firstName: string | null;
  email: string | null;
  imageUrl?: string;
}

interface AppAuthContextType {
  user: AppUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signOut: () => Promise<void>;
}

const AppAuthContext = createContext<AppAuthContextType | null>(null);

export function AppAuthProvider({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, isLoading, signOut } = useMockAuth();

  const appUser = user
    ? {
        fullName: user.fullName,
        firstName: user.firstName || null,
        email: user.email,
        imageUrl: user.imageUrl,
      }
    : null;

  return (
    <AppAuthContext.Provider
      value={{
        user: appUser,
        isAuthenticated,
        isLoading,
        signOut,
      }}
    >
      {children}
    </AppAuthContext.Provider>
  );
}

export function useAppAuth() {
  const context = useContext(AppAuthContext);
  if (!context) {
    throw new Error('useAppAuth must be used within AppAuthProvider');
  }
  return context;
}
