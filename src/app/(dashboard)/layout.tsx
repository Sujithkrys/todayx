import React from 'react';
import { Sidebar } from '@/components/shared/sidebar';

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
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-white">
        {/* Scrollable View Area */}
        <main className="flex-1 overflow-y-auto relative focus:outline-none p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
