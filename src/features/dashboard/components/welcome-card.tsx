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
    <div className="relative overflow-hidden rounded-xl border bg-card p-6 shadow-sm">
      {/* Background Gradient Mesh */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/10 opacity-60 pointer-events-none" />
      
      <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-primary">
            <Sparkles className="w-5 h-5" />
            <span className="text-xs font-semibold uppercase tracking-wider">Workspace Dashboard</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
            Welcome back, {user?.firstName || 'Guest'}
          </h1>
          <p className="text-sm text-muted-foreground max-w-xl">
            Here is your workspace overview for today. All connected integrations and automated agent actions are active.
          </p>
        </div>

        {/* Date Display */}
        <div className="flex items-center gap-2 self-start md:self-center px-3 py-1.5 rounded-lg border bg-background text-xs font-medium text-muted-foreground shadow-sm shrink-0">
          <Calendar className="w-4 h-4" />
          <span>{currentDate}</span>
        </div>
      </div>
    </div>
  );
}
