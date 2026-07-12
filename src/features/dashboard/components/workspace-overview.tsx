'use client';

import React from 'react';
import { ArrowUpRight, Users, Activity, Clock } from 'lucide-react';

interface Metric {
  name: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.ComponentType<{ className?: string }>;
}

const METRICS: Metric[] = [
  { name: 'Active Conversations', value: '1,482', change: '+12.5%', trend: 'up', icon: Users },
  { name: 'Agent Executions', value: '98.4%', change: '+0.8%', trend: 'up', icon: Activity },
  { name: 'Avg. Response Time', value: '1.2s', change: '-4.2%', trend: 'up', icon: Clock },
];

export function WorkspaceOverview() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {METRICS.map((metric) => (
        <div key={metric.name} className="rounded-xl border bg-card p-5 shadow-sm space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">{metric.name}</span>
            <div className="p-2 rounded-lg bg-muted/50 text-muted-foreground shrink-0">
              <metric.icon className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold tracking-tight text-foreground">{metric.value}</span>
            <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 px-1.5 py-0.5 rounded">
              <ArrowUpRight className="w-3 h-3" />
              {metric.change}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
