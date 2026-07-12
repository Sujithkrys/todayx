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
    <div className="flex flex-col h-full bg-white text-gray-900 font-sans p-2 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">Dashboard Overview</h1>
      </div>

      {/* Top Welcome / Overview Section */}
      <div className="space-y-4">
        <Suspense fallback={<div className="h-32 rounded-lg bg-gray-50 border border-gray-100 animate-pulse" />}>
          <WelcomeCard />
        </Suspense>
        
        <Suspense fallback={<div className="h-24 rounded-lg bg-gray-50 border border-gray-100 animate-pulse" />}>
          <WorkspaceOverview />
        </Suspense>
      </div>

      {/* Main Grid View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-6">
        {/* Left Double-Column Section: AI Logs, Tasks */}
        <div className="lg:col-span-2 space-y-6">
          <Suspense fallback={<div className="h-48 rounded-lg bg-gray-50 border border-gray-100 animate-pulse" />}>
            <AIBrief />
          </Suspense>

          <Suspense fallback={<div className="h-56 rounded-lg bg-gray-50 border border-gray-100 animate-pulse" />}>
            <TodayTasks />
          </Suspense>

          <Suspense fallback={<div className="h-64 rounded-lg bg-gray-50 border border-gray-100 animate-pulse" />}>
            <AITimeline />
          </Suspense>
        </div>

        {/* Right Single-Column Section: Calendar, Shortcuts */}
        <div className="space-y-6">
          <Suspense fallback={<div className="h-52 rounded-lg bg-gray-50 border border-gray-100 animate-pulse" />}>
            <UpcomingEvents />
          </Suspense>

          <Suspense fallback={<div className="h-60 rounded-lg bg-gray-50 border border-gray-100 animate-pulse" />}>
            <QuickActions />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
