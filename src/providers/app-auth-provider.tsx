'use client';

import React, { createContext, useContext } from 'react';
import { useUser, useClerk } from '@clerk/nextjs';
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

const CLERK_KEY = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

function ClerkAuthWrapper({ children }: { children: React.ReactNode }) {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();

  const appUser = user
    ? {
        fullName: user.fullName,
        firstName: user.firstName,
        email: user.primaryEmailAddress?.emailAddress || null,
        imageUrl: user.imageUrl,
      }
    : null;

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <AppAuthContext.Provider
      value={{
        user: appUser,
        isAuthenticated: !!user,
        isLoading: !isLoaded,
        signOut: handleSignOut,
      }}
    >
      {children}
    </AppAuthContext.Provider>
  );
}

function MockAuthWrapper({ children }: { children: React.ReactNode }) {
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

export function AppAuthProvider({ children }: { children: React.ReactNode }) {
  // If Clerk Publishable key is provided, mount Clerk wrapper, otherwise use Mock wrapper
  if (CLERK_KEY) {
    return <ClerkAuthWrapper>{children}</ClerkAuthWrapper>;
  }

  return <MockAuthWrapper>{children}</MockAuthWrapper>;
}

export function useAppAuth() {
  const context = useContext(AppAuthContext);
  if (!context) {
    throw new Error('useAppAuth must be used within AppAuthProvider');
  }
  return context;
}
