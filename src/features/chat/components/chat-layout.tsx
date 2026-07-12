'use client';

import React from 'react';
import { Search, MessageSquare, MoreHorizontal, Pin, Trash2, Edit2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ChatInterface } from './chat-interface';

// Mock conversation history
const HISTORY = [
  { id: '1', title: 'Q3 Product Roadmap Planning', date: 'Today', pinned: true },
  { id: '2', title: 'Debug Slack Integration Error', date: 'Yesterday', pinned: false },
  { id: '3', title: 'Generate weekly team report', date: 'Last Week', pinned: false },
  { id: '4', title: 'How to configure custom webhooks?', date: 'Last Week', pinned: false },
];

export function ChatLayout() {
  const [search, setSearch] = React.useState('');

  return (
    <div className="flex h-full bg-white overflow-hidden rounded-xl border border-gray-100 shadow-sm">
      
      {/* Internal Chat Sidebar (History) */}
      <div className="hidden md:flex flex-col w-64 border-r border-gray-100 bg-gray-50/30 shrink-0">
        <div className="p-4 border-b border-gray-100">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search conversations..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all placeholder:text-gray-400"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-4">
          
          {/* Pinned */}
          <div className="space-y-1">
            <h3 className="px-2 text-[10px] font-bold uppercase tracking-wider text-gray-400">Pinned</h3>
            {HISTORY.filter(h => h.pinned).map(chat => (
              <div key={chat.id} className="group flex items-center justify-between px-2 py-2 rounded-lg hover:bg-gray-100/80 cursor-pointer transition-colors">
                <div className="flex items-center gap-2 overflow-hidden">
                  <Pin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  <span className="text-[13px] text-gray-700 font-medium truncate">{chat.title}</span>
                </div>
                <button className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-gray-900 transition-opacity">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Recent */}
          <div className="space-y-1">
            <h3 className="px-2 text-[10px] font-bold uppercase tracking-wider text-gray-400">Recent</h3>
            {HISTORY.filter(h => !h.pinned).map(chat => (
              <div key={chat.id} className="group flex items-center justify-between px-2 py-2 rounded-lg hover:bg-gray-100/80 cursor-pointer transition-colors">
                <div className="flex items-center gap-2 overflow-hidden">
                  <MessageSquare className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  <span className="text-[13px] text-gray-700 truncate">{chat.title}</span>
                </div>
                <button className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-gray-900 transition-opacity">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 min-w-0">
        <ChatInterface />
      </div>

    </div>
  );
}
