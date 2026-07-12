'use client';

import React from 'react';
import { Bot, RefreshCw, CheckCircle } from 'lucide-react';

export function AIBrief() {
  return (
    <div className="rounded-lg border border-gray-100 bg-white p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md border border-gray-100 bg-gray-50 text-gray-500">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h2 className="font-semibold text-[15px] text-gray-900 leading-none">AI Daily Brief</h2>
            <span className="text-[10px] text-gray-400">Generated 10m ago</span>
          </div>
        </div>
        <button className="p-1.5 rounded-md hover:bg-gray-50 text-gray-400 hover:text-gray-700 transition-colors">
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Notion-style executive list */}
      <div className="space-y-3">
        <div className="flex items-start gap-3 p-3 rounded-md border border-gray-100 bg-gray-50/50">
          <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
          <div className="space-y-0.5">
            <h3 className="text-[13px] font-semibold text-gray-800">Workspace synchronisation complete</h3>
            <p className="text-[11px] text-gray-500">
              Processed 14 new emails from connected providers. All contact records updated successfully.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3 rounded-md border border-gray-100 bg-gray-50/50">
          <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
          <div className="space-y-0.5">
            <h3 className="text-[13px] font-semibold text-gray-800">AI agent automation active</h3>
            <p className="text-[11px] text-gray-500">
              Agent **Voicera-Sync** successfully verified 3 pending calendar invitations for matching client locations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
