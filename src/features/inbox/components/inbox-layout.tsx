'use client';

import React from 'react';
import { Mail, AlertCircle, AlertOctagon, Archive, Search, MoreHorizontal, Inbox as InboxIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { EmailList } from './email-list';
import { EmailDetail } from './email-detail';

export type Category = 'important' | 'others' | 'spam';

export function InboxLayout() {
  const [activeCategory, setActiveCategory] = React.useState<Category>('important');
  const [selectedEmailId, setSelectedEmailId] = React.useState<string | null>(null);

  const categories = [
    { id: 'important', label: 'Important', icon: AlertCircle, count: 3 },
    { id: 'others', label: 'Others', icon: InboxIcon, count: 12 },
    { id: 'spam', label: 'Spam', icon: AlertOctagon, count: 5 },
  ] as const;

  return (
    <div className="flex h-full bg-white overflow-hidden rounded-xl border border-gray-100 shadow-sm">
      
      {/* Inbox Sidebar */}
      <div className="hidden md:flex flex-col w-56 border-r border-gray-100 bg-gray-50/30 shrink-0">
        <div className="p-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900 text-sm flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Gmail Inbox
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setSelectedEmailId(null); // Reset selection on category change
                }}
                className={cn(
                  "w-full flex items-center justify-between px-3 py-2 rounded-lg text-[13px] font-medium transition-colors",
                  isActive 
                    ? "bg-gray-100/70 text-gray-900" 
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon className={cn("w-4 h-4", isActive ? "text-gray-900" : "text-gray-400")} />
                  {cat.label}
                </div>
                {cat.count > 0 && (
                  <span className={cn(
                    "text-[10px] font-bold px-1.5 py-0.5 rounded-full",
                    isActive ? "bg-white shadow-sm text-gray-900" : "bg-gray-100 text-gray-500"
                  )}>
                    {cat.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Email List */}
      <div className={cn(
        "flex flex-col border-r border-gray-100 transition-all duration-300",
        selectedEmailId ? "hidden lg:flex w-80 shrink-0" : "flex-1"
      )}>
        <EmailList 
          category={activeCategory} 
          selectedEmailId={selectedEmailId}
          onSelectEmail={setSelectedEmailId} 
        />
      </div>

      {/* Email Detail Pane */}
      <div className={cn(
        "flex-1 min-w-0 bg-white",
        !selectedEmailId ? "hidden lg:flex items-center justify-center bg-gray-50/50" : "flex flex-col"
      )}>
        {selectedEmailId ? (
          <EmailDetail emailId={selectedEmailId} onClose={() => setSelectedEmailId(null)} />
        ) : (
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4 text-gray-400">
              <Mail className="w-8 h-8 opacity-50" />
            </div>
            <p className="text-[13px] text-gray-500 font-medium">Select an email to read</p>
          </div>
        )}
      </div>

    </div>
  );
}
