'use client';

import React from 'react';
import { Bot, RefreshCw, CheckCircle } from 'lucide-react';

export function AIBrief() {
  return (
    <div className="rounded-xl border bg-card text-card-foreground p-6 shadow-sm space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-semibold text-base leading-none">AI Daily Brief</h2>
            <span className="text-[10px] text-muted-foreground">Generated 10m ago</span>
          </div>
        </div>
        <button className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Notion-style executive list */}
      <div className="space-y-3">
        <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/40 hover:bg-muted/65 transition-colors">
          <CheckCircle className="w-4.5 h-4.5 text-primary mt-0.5 shrink-0" />
          <div className="space-y-0.5">
            <h3 className="text-xs font-semibold text-foreground">Workspace synchronisation complete</h3>
            <p className="text-[11px] text-muted-foreground">
              Processed 14 new emails from connected providers. All contact records updated successfully.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/40 hover:bg-muted/65 transition-colors">
          <CheckCircle className="w-4.5 h-4.5 text-primary mt-0.5 shrink-0" />
          <div className="space-y-0.5">
            <h3 className="text-xs font-semibold text-foreground">AI agent automation active</h3>
            <p className="text-[11px] text-muted-foreground">
              Agent **Voicera-Sync** successfully verified 3 pending calendar invitations for matching client locations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
