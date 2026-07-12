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
    <div className="rounded-lg border border-gray-100 bg-white p-6 space-y-4">
      <div className="flex items-center justify-between border-b border-gray-50 pb-3">
        <div className="flex items-center gap-2 text-gray-900">
          <Terminal className="w-4 h-4 text-gray-400" />
          <h2 className="font-semibold text-[15px] leading-none">Agent Execution Logs</h2>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100/50">Real-time</span>
      </div>

      <div className="space-y-4">
        {LOGS.map((log) => (
          <div key={log.id} className="flex items-start justify-between gap-3 text-xs">
            <div className="flex items-start gap-3">
              <div className="p-1.5 rounded-md border border-gray-100 bg-gray-50 shrink-0 mt-0.5">
                <Cpu className="w-3.5 h-3.5 text-gray-500" />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-gray-800 text-[13px]">{log.agentName}</span>
                  <span className="text-[10px] text-gray-400">• {log.time}</span>
                </div>
                <p className="text-[11px] text-gray-500 leading-normal">{log.action}</p>
              </div>
            </div>

            {log.status === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
