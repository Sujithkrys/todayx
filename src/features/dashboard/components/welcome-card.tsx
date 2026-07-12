'use client';

import React from 'react';
import { useAppAuth } from '@/providers/app-auth-provider';
import { Sparkles, Calendar } from 'lucide-react';

export function WelcomeCard() {
  const { user } = useAppAuth();
  
  // Format current date nicely
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="relative overflow-hidden rounded-lg border border-gray-100 bg-white p-6">
      <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-gray-400">
            <Sparkles className="w-4 h-4" />
            <span className="text-[11px] font-bold uppercase tracking-wider">Workspace Dashboard</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Welcome back, {user?.firstName || 'Guest'}
          </h1>
          <p className="text-[13px] text-gray-500 max-w-xl">
            Here is your workspace overview for today. All connected integrations and automated agent actions are active.
          </p>
        </div>

        {/* Date Display */}
        <div className="flex items-center gap-2 self-start md:self-center px-3 py-1.5 rounded-md border border-gray-100 bg-gray-50 text-xs font-medium text-gray-600 shrink-0">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span>{currentDate}</span>
        </div>
      </div>
    </div>
  );
}
