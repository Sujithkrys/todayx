'use client';

import React, { useEffect, useState } from 'react';
import { Mail, AlertCircle, AlertOctagon, Archive, Search, MoreHorizontal, Inbox as InboxIcon, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { EmailList } from './email-list';
import { EmailDetail } from './email-detail';
import { fetchEmails, EmailData, GmailCategory } from '@/app/actions/gmail';

export function InboxLayout() {
  const [activeCategory, setActiveCategory] = useState<GmailCategory>('important');
  const [selectedEmailId, setSelectedEmailId] = useState<string | null>(null);
  
  const [emails, setEmails] = useState<EmailData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    
    async function loadEmails() {
      setIsLoading(true);
      setError(null);
      try {
        const fetchedEmails = await fetchEmails(activeCategory);
        if (isMounted) {
          setEmails(fetchedEmails);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err.message || 'Failed to fetch emails');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadEmails();
    return () => {
      isMounted = false;
    };
  }, [activeCategory]);

  const categories = [
    { id: 'important', label: 'Important', icon: AlertCircle, count: activeCategory === 'important' ? emails.length : 0 },
    { id: 'others', label: 'Others', icon: InboxIcon, count: activeCategory === 'others' ? emails.length : 0 },
    { id: 'spam', label: 'Spam', icon: AlertOctagon, count: activeCategory === 'spam' ? emails.length : 0 },
  ] as const;

  const selectedEmail = emails.find(e => e.id === selectedEmailId);

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
                  setActiveCategory(cat.id as GmailCategory);
                  setSelectedEmailId(null);
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
                {isActive && (
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
        {isLoading ? (
          <div className="flex items-center justify-center flex-1 h-full flex-col gap-3 text-gray-400">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span className="text-sm">Fetching from Gmail...</span>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center flex-1 h-full px-6 text-center text-red-500">
            <span className="text-sm">{error}</span>
          </div>
        ) : (
          <EmailList 
            category={activeCategory} 
            selectedEmailId={selectedEmailId}
            onSelectEmail={setSelectedEmailId} 
            emails={emails}
          />
        )}
      </div>

      {/* Email Detail Pane */}
      <div className={cn(
        "flex-1 min-w-0 bg-white",
        !selectedEmailId ? "hidden lg:flex items-center justify-center bg-gray-50/50" : "flex flex-col"
      )}>
        {selectedEmail ? (
          <EmailDetail email={selectedEmail} onClose={() => setSelectedEmailId(null)} />
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
