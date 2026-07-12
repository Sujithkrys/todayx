import React, { Suspense } from 'react';
import { WelcomeCard } from '@/features/dashboard/components/welcome-card';
import { AIBrief } from '@/features/dashboard/components/ai-brief';
import { WorkspaceOverview } from '@/features/dashboard/components/workspace-overview';
import { TodayTasks } from '@/features/dashboard/components/today-tasks';
import { UpcomingEvents } from '@/features/dashboard/components/upcoming-events';
import { AITimeline } from '@/features/dashboard/components/ai-timeline';
import { QuickActions } from '@/features/dashboard/components/quick-actions';

export default function DashboardPage() {
  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-6">
      {/* Top Welcome / Overview Section */}
      <div className="space-y-4">
        <Suspense fallback={<div className="h-32 rounded-xl bg-card border animate-pulse" />}>
          <WelcomeCard />
        </Suspense>
        
        <Suspense fallback={<div className="h-24 rounded-xl bg-card border animate-pulse" />}>
          <WorkspaceOverview />
        </Suspense>
      </div>

      {/* Main Grid View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Double-Column Section: AI Logs, Tasks */}
        <div className="lg:col-span-2 space-y-6">
          <Suspense fallback={<div className="h-48 rounded-xl bg-card border animate-pulse" />}>
            <AIBrief />
          </Suspense>

          <Suspense fallback={<div className="h-56 rounded-xl bg-card border animate-pulse" />}>
            <TodayTasks />
          </Suspense>

          <Suspense fallback={<div className="h-64 rounded-xl bg-card border animate-pulse" />}>
            <AITimeline />
          </Suspense>
        </div>

        {/* Right Single-Column Section: Calendar, Shortcuts */}
        <div className="space-y-6">
          <Suspense fallback={<div className="h-52 rounded-xl bg-card border animate-pulse" />}>
            <UpcomingEvents />
          </Suspense>

          <Suspense fallback={<div className="h-60 rounded-xl bg-card border animate-pulse" />}>
            <QuickActions />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
