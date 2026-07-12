'use client';

import { ClerkProvider } from '@clerk/nextjs';
import { ThemeProvider } from './theme-provider';
import { QueryProvider } from './query-provider';

export function RootProvider({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
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
    </ClerkProvider>
  );
}
