'use client';

import { ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';
import { ConvexClientProvider } from './convex-client-provider';

export function RootProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ConvexClientProvider>
        {children}
      </ConvexClientProvider>
    </ThemeProvider>
  );
}
