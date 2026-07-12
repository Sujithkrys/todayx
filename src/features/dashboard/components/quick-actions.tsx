'use client';

import React from 'react';
import { Plus, Settings, Sparkles, Send } from 'lucide-react';
import { toast } from 'sonner';

interface Action {
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const ACTIONS: Action[] = [
  { name: 'Trigger Agent', description: 'Force sync integrations', icon: Sparkles },
  { name: 'Add Task', description: 'Create custom reminder', icon: Plus },
  { name: 'Broadcast', description: 'Notify slack channels', icon: Send },
  { name: 'Config Settings', description: 'Manage preferences', icon: Settings },
];

export function QuickActions() {
  const triggerAction = (name: string) => {
    toast.success(`Action "${name}" triggered successfully!`);
  };

  return (
    <div className="rounded-xl border bg-card text-card-foreground p-6 shadow-sm space-y-4">
      <h2 className="font-semibold text-base leading-none">Quick Actions</h2>

      <div className="grid grid-cols-2 gap-3">
        {ACTIONS.map((action) => (
          <button
            key={action.name}
            onClick={() => triggerAction(action.name)}
            className="flex flex-col items-start text-left p-3.5 rounded-lg border bg-background/50 hover:bg-muted/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <action.icon className="w-5 h-5 text-muted-foreground mb-2 shrink-0" />
            <span className="text-xs font-semibold text-foreground truncate w-full">{action.name}</span>
            <span className="text-[10px] text-muted-foreground truncate w-full mt-0.5">{action.description}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
