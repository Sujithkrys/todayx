import React from 'react';
import { Search } from 'lucide-react';
import { Category } from './inbox-layout';
import { cn } from '@/lib/utils';
import { MOCK_EMAILS } from '../data/mock-emails';

interface EmailListProps {
  category: Category;
  selectedEmailId: string | null;
  onSelectEmail: (id: string) => void;
}

export function EmailList({ category, selectedEmailId, onSelectEmail }: EmailListProps) {
  const [search, setSearch] = React.useState('');

  const filteredEmails = MOCK_EMAILS.filter(email => {
    const matchesCategory = email.category === category;
    const matchesSearch = email.subject.toLowerCase().includes(search.toLowerCase()) || 
                          email.sender.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Search Header */}
      <div className="p-3 border-b border-gray-100">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search emails..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-gray-50 border-none rounded-md text-[13px] focus:outline-none focus:ring-1 focus:ring-gray-200 transition-all placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto">
        {filteredEmails.length === 0 ? (
          <div className="p-8 text-center text-[13px] text-gray-500">
            No emails found in this category.
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {filteredEmails.map((email) => (
              <button
                key={email.id}
                onClick={() => onSelectEmail(email.id)}
                className={cn(
                  "w-full text-left p-4 hover:bg-gray-50 transition-colors focus:outline-none flex flex-col gap-1",
                  selectedEmailId === email.id ? "bg-gray-50 relative before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-gray-900" : "",
                  !email.isRead ? "bg-white" : "opacity-75"
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className={cn("text-[13px] truncate", !email.isRead ? "font-bold text-gray-900" : "font-medium text-gray-700")}>
                    {email.sender}
                  </span>
                  <span className="text-[10px] text-gray-400 shrink-0 font-medium">
                    {email.date}
                  </span>
                </div>
                <h4 className={cn("text-[12px] truncate", !email.isRead ? "font-bold text-gray-800" : "font-medium text-gray-600")}>
                  {email.subject}
                </h4>
                <p className="text-[12px] text-gray-500 truncate mt-0.5">
                  {email.snippet}
                </p>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
