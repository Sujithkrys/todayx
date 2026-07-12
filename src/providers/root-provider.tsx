'use client';

import { ThemeProvider } from './theme-provider';
import { QueryProvider } from './query-provider';
import { AppAuthProvider } from './app-auth-provider';

export function RootProvider({ children }: { children: React.ReactNode }) {
  return (
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
}
