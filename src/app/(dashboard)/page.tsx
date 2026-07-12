import React, { Suspense } from 'react';
import { WelcomeCard } from '@/features/dashboard/components/welcome-card';
import { AIBrief } from '@/features/dashboard/components/ai-brief';

export default function DashboardPage() {
  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-6">
      {/* Top Section: Personalised Greeting */}
      <Suspense fallback={<div className="h-40 rounded-xl bg-card border animate-pulse" />}>
        <WelcomeCard />
      </Suspense>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: AI Brief & Activities */}
        <div className="lg:col-span-2 space-y-6">
          <Suspense fallback={<div className="h-48 rounded-xl bg-card border animate-pulse" />}>
            <AIBrief />
          </Suspense>
          
          {/* We will add Tasks, Conversations, and Timelines here in the next turns */}
          <div className="h-96 border border-dashed rounded-xl flex items-center justify-center text-muted-foreground text-sm">
            Additional widgets loading...
          </div>
        </div>

        {/* Right Column: Calendar, Actions, and Overview */}
        <div className="space-y-6">
          <div className="h-80 border border-dashed rounded-xl flex items-center justify-center text-muted-foreground text-sm">
            Quick Actions & Overview loading...
          </div>
        </div>
      </div>
    </div>
  );
}
