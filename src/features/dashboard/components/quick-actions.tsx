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
    <div className="rounded-lg border border-gray-100 bg-white p-6 space-y-4">
      <h2 className="font-semibold text-[15px] text-gray-900 leading-none">Quick Actions</h2>

      <div className="grid grid-cols-2 gap-3 mt-2">
        {ACTIONS.map((action) => (
          <button
            key={action.name}
            onClick={() => triggerAction(action.name)}
            className="flex flex-col items-start text-left p-3.5 rounded-md border border-gray-100 bg-gray-50 hover:bg-gray-100/50 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-300"
          >
            <action.icon className="w-5 h-5 text-gray-400 mb-2 shrink-0" />
            <span className="text-[13px] font-semibold text-gray-800 truncate w-full">{action.name}</span>
            <span className="text-[11px] text-gray-500 truncate w-full mt-0.5">{action.description}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
