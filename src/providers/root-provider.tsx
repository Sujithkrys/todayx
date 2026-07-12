'use client';

import { ClerkProvider } from '@clerk/nextjs';
import { ThemeProvider } from './theme-provider';
import { QueryProvider } from './query-provider';
import { MockAuthProvider } from './mock-auth-provider';

import { AppAuthProvider } from './app-auth-provider';

const CLERK_KEY = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

export function RootProvider({ children }: { children: React.ReactNode }) {
  const content = (
    <AppAuthProvider>
      <QueryProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </QueryProvider>
    </AppAuthProvider>
  );

  // If Clerk Publishable key is provided, mount Clerk, otherwise use Mock Auth
  if (CLERK_KEY) {
    return <ClerkProvider>{content}</ClerkProvider>;
  }

  return <MockAuthProvider>{content}</MockAuthProvider>;
}
