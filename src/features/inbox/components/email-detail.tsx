import React from 'react';
import { ArrowLeft, MoreHorizontal, Reply, Forward, Star, Archive, Trash2 } from 'lucide-react';
import { MOCK_EMAILS } from '../data/mock-emails';

interface EmailDetailProps {
  emailId: string;
  onClose: () => void;
}

export function EmailDetail({ emailId, onClose }: EmailDetailProps) {
  const email = MOCK_EMAILS.find(e => e.id === emailId);

  if (!email) return null;

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-3 border-b border-gray-100">
        <div className="flex items-center gap-1">
          <button 
            onClick={onClose}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100 text-gray-500 transition-colors mr-1"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          
          <button className="p-2 rounded-md hover:bg-gray-100 text-gray-500 transition-colors" title="Archive">
            <Archive className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-md hover:bg-gray-100 text-gray-500 transition-colors" title="Delete">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
        
        <div className="flex items-center gap-1">
          <button className="p-2 rounded-md hover:bg-gray-100 text-gray-500 transition-colors">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 md:p-8 max-w-3xl mx-auto">
          <div className="flex items-start justify-between gap-4 mb-8">
            <h1 className="text-xl font-bold text-gray-900 leading-tight">
              {email.subject}
            </h1>
            <button className="p-1.5 rounded hover:bg-gray-100 text-gray-400 transition-colors shrink-0">
              <Star className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-500 font-bold text-sm">
                {email.sender.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-[14px] text-gray-900">{email.sender}</span>
                  <span className="text-[12px] text-gray-500">&lt;{email.senderEmail}&gt;</span>
                </div>
                <div className="text-[11px] text-gray-400 mt-0.5">
                  to me
                </div>
              </div>
            </div>
            <div className="text-[12px] font-medium text-gray-500">
              {email.date}
            </div>
          </div>

          <div className="prose prose-sm prose-gray max-w-none text-[14px] leading-relaxed">
            {email.body.split('\n').map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="mt-12 flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-full text-[13px] font-semibold text-gray-700 transition-colors">
              <Reply className="w-4 h-4" />
              Reply
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-full text-[13px] font-semibold text-gray-700 transition-colors">
              <Forward className="w-4 h-4" />
              Forward
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
