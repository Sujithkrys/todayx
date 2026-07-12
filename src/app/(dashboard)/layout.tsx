import React from 'react';
import { Sidebar } from '@/components/shared/sidebar';
import { Header } from '@/components/shared/header';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Persistent App Sidebar */}
      <Sidebar />

      {/* Main Workspace Frame */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navigation */}
        <Header />

        {/* Scrollable View Area */}
        <main className="flex-1 overflow-y-auto bg-muted/20 relative focus:outline-none">
          {children}
        </main>
      </div>
    </div>
  );
}
