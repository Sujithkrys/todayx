import React from 'react';
import { cn } from '@/lib/utils';
import { GmailCategory, EmailData } from '@/app/actions/gmail';

interface EmailListProps {
  category: GmailCategory;
  selectedEmailId: string | null;
  onSelectEmail: (id: string) => void;
  emails: EmailData[];
}

export function EmailList({ category, selectedEmailId, onSelectEmail, emails }: EmailListProps) {
  if (emails.length === 0) {
    return (
      <div className="flex items-center justify-center h-full p-8 text-[13px] text-gray-500">
        No emails found in this category.
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
      {emails.map((email) => {
        const isSelected = email.id === selectedEmailId;
        
        return (
          <button
            key={email.id}
            onClick={() => onSelectEmail(email.id)}
            className={cn(
              "w-full text-left p-4 transition-all duration-200 border-l-2",
              isSelected 
                ? "bg-blue-50/50 border-blue-500" 
                : email.isRead
                  ? "bg-white border-transparent hover:bg-gray-50/50"
                  : "bg-white border-transparent hover:bg-gray-50/50 relative before:absolute before:left-3 before:top-5 before:w-1.5 before:h-1.5 before:bg-blue-500 before:rounded-full"
            )}
          >
            <div className="flex items-baseline justify-between mb-1 pl-4">
              <span className={cn(
                "text-[13px] truncate pr-2",
                !email.isRead ? "font-bold text-gray-900" : "font-medium text-gray-700"
              )}>
                {email.sender}
              </span>
              <span className={cn(
                "text-[11px] whitespace-nowrap shrink-0",
                !email.isRead ? "font-semibold text-blue-600" : "text-gray-500"
              )}>
                {email.date}
              </span>
            </div>
            
            <div className="pl-4">
              <h4 className={cn(
                "text-[13px] mb-1 line-clamp-1 leading-snug",
                !email.isRead ? "font-semibold text-gray-900" : "font-medium text-gray-800"
              )}>
                {email.subject}
              </h4>
              <p className="text-[12px] text-gray-500 line-clamp-2 leading-relaxed">
                {email.snippet}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
