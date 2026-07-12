import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { RootProvider } from '@/providers/root-provider';
import { Toaster } from 'sonner';
import { MockAuthProvider } from '@/providers/mock-auth-provider';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Databolt — SaaS Platform',
  description: 'Enterprise Contact Dashboard & Workspace',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const content = (
    <RootProvider>
      {children}
      <Toaster position="top-right" richColors />
    </RootProvider>
  );

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background text-foreground`} suppressHydrationWarning>
        <MockAuthProvider>{content}</MockAuthProvider>
      </body>
    </html>
  );
}
