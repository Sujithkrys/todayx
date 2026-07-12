import React from 'react';
import { ArrowLeft, MoreHorizontal, Reply, Forward, Star, Archive, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { EmailData } from '@/app/actions/gmail';

interface EmailDetailProps {
  email: EmailData;
  onClose: () => void;
}

export function EmailDetail({ email, onClose }: EmailDetailProps) {
  if (!email) return null;

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Detail Toolbar */}
      <div className="h-14 flex items-center justify-between px-4 border-b border-gray-100 shrink-0">
        <div className="flex items-center gap-1">
          <button 
            onClick={onClose}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100 text-gray-500 transition-colors mr-2"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          
          <div className="flex items-center gap-1 bg-gray-50/50 p-1 rounded-lg border border-gray-100">
            <button className="p-1.5 rounded hover:bg-white hover:shadow-sm text-gray-500 transition-all" title="Archive">
              <Archive className="w-4 h-4" />
            </button>
            <button className="p-1.5 rounded hover:bg-white hover:shadow-sm text-gray-500 transition-all" title="Delete">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="p-2 rounded-md hover:bg-gray-100 text-gray-500 transition-colors" title="More">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Email Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 md:p-8 max-w-3xl mx-auto">
          <div className="flex items-start justify-between gap-4 mb-8">
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight">
              {email.subject}
            </h1>
            <button className="p-2 rounded-md hover:bg-gray-50 text-gray-400 hover:text-yellow-500 transition-colors shrink-0 mt-1">
              <Star className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-100 to-blue-50 border border-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm shadow-sm">
                {email.sender.charAt(0)}
              </div>
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="font-semibold text-[14px] text-gray-900">{email.sender}</span>
                  <span className="text-[12px] text-gray-500">&lt;{email.senderEmail}&gt;</span>
                </div>
                <div className="text-[12px] text-gray-500 font-medium">to me</div>
              </div>
            </div>
            
            <div className="text-[12px] font-medium text-gray-500 bg-gray-50 px-2 py-1 rounded-md">
              {email.date}
            </div>
          </div>

          <div className="prose prose-sm prose-gray max-w-none prose-p:leading-relaxed prose-a:text-blue-600 prose-headings:text-gray-900 text-[14px]">
            {email.body ? (
              <div dangerouslySetInnerHTML={{ __html: email.body.replace(/\n/g, '<br/>') }} />
            ) : (
              <p className="text-gray-400 italic">No content</p>
            )}
          </div>
        </div>
      </div>

      {/* Reply Actions */}
      <div className="p-4 border-t border-gray-100 bg-gray-50/30">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <button className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-white border border-gray-200 rounded-lg text-[13px] font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm">
            <Reply className="w-4 h-4" />
            Reply
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-white border border-gray-200 rounded-lg text-[13px] font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm">
            <Forward className="w-4 h-4" />
            Forward
          </button>
        </div>
      </div>
    </div>
  );
}
