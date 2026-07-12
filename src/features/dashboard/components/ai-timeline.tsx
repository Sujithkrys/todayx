'use client';

import React from 'react';
import { Cpu, Terminal, CheckCircle2, AlertCircle } from 'lucide-react';

interface Log {
  id: string;
  agentName: string;
  action: string;
  time: string;
  status: 'success' | 'warning';
}

const LOGS: Log[] = [
  { id: '1', agentName: 'Voicera-Sync', action: 'Synchronised 14 mailbox records', time: '10m ago', status: 'success' },
  { id: '2', agentName: 'Classifier-Agent', action: 'Sorted inbox into folder segments', time: '22m ago', status: 'success' },
  { id: '3', agentName: 'SlackNotifier', action: 'Failed to send alert to webhook', time: '1h ago', status: 'warning' },
];

export function AITimeline() {
  return (
    <div className="rounded-xl border bg-card text-card-foreground p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Terminal className="w-4.5 h-4.5 text-muted-foreground" />
          <h2 className="font-semibold text-base leading-none">Agent Execution Logs</h2>
        </div>
        <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Real-time</span>
      </div>

      <div className="space-y-4">
        {LOGS.map((log) => (
          <div key={log.id} className="flex items-start justify-between gap-3 text-xs">
            <div className="flex items-start gap-2.5">
              <div className="p-1 rounded bg-muted/65 shrink-0 mt-0.5">
                <Cpu className="w-3.5 h-3.5 text-muted-foreground" />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-foreground">{log.agentName}</span>
                  <span className="text-[10px] text-muted-foreground">• {log.time}</span>
                </div>
                <p className="text-[11px] text-muted-foreground leading-normal">{log.action}</p>
              </div>
            </div>

            {log.status === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
