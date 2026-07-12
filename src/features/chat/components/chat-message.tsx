'use client';

import React from 'react';
import { Message } from 'ai';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { Bot, User, Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAppAuth } from '@/providers/app-auth-provider';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';
  const { user } = useAppAuth();
  
  const [copied, setCopied] = React.useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className={cn("flex gap-4 w-full group", isUser ? "flex-row-reverse" : "flex-row")}>
      
      {/* Avatar */}
      <div className={cn(
        "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-1",
        isUser ? "bg-gray-100 text-gray-600" : "bg-gray-900 text-white shadow-sm"
      )}>
        {isUser ? (
          <span className="text-xs font-bold">{user?.firstName?.charAt(0) || 'U'}</span>
        ) : (
          <Bot className="w-4.5 h-4.5" />
        )}
      </div>

      {/* Message Content */}
      <div className={cn(
        "flex flex-col gap-1 max-w-[85%]",
        isUser ? "items-end" : "items-start"
      )}>
        <div className="flex items-center gap-2 px-1">
          <span className="text-xs font-semibold text-gray-700">{isUser ? 'You' : 'Voicera AI'}</span>
          <span className="text-[10px] text-gray-400">
            {message.createdAt ? new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
          </span>
        </div>

        <div className={cn(
          "px-4 py-3 text-[14px] leading-relaxed",
          isUser 
            ? "bg-gray-100 text-gray-900 rounded-2xl rounded-tr-sm" 
            : "bg-white border border-gray-100 shadow-sm text-gray-800 rounded-2xl rounded-tl-sm prose prose-sm prose-gray max-w-none"
        )}>
          {isUser ? (
            <div className="whitespace-pre-wrap">{message.content}</div>
          ) : (
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code({ node, inline, className, children, ...props }: any) {
                  const match = /language-(\w+)/.exec(className || '');
                  const language = match ? match[1] : '';
                  const codeString = String(children).replace(/\n$/, '');
                  const codeId = Math.random().toString(36).substring(7);

                  if (!inline && match) {
                    return (
                      <div className="relative my-4 rounded-lg overflow-hidden border border-gray-100 bg-gray-50/50 group/code">
                        <div className="flex items-center justify-between px-3 py-1.5 bg-gray-100/80 border-b border-gray-200/60">
                          <span className="text-[10px] font-mono font-semibold text-gray-500 uppercase">{language}</span>
                          <button
                            onClick={() => copyToClipboard(codeString, codeId)}
                            className="p-1 rounded hover:bg-gray-200 text-gray-500 transition-colors"
                          >
                            {copied === codeId ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                        <SyntaxHighlighter
                          {...props}
                          style={oneLight}
                          language={language}
                          PreTag="div"
                          customStyle={{ margin: 0, padding: '1rem', background: 'transparent', fontSize: '13px' }}
                        >
                          {codeString}
                        </SyntaxHighlighter>
                      </div>
                    );
                  }
                  return (
                    <code {...props} className={cn("px-1.5 py-0.5 rounded-md bg-gray-100 text-gray-800 font-mono text-[12px] font-semibold", className)}>
                      {children}
                    </code>
                  );
                },
                table({ children }) {
                  return (
                    <div className="overflow-x-auto my-4 border border-gray-100 rounded-lg">
                      <table className="w-full text-left text-[13px] m-0">{children}</table>
                    </div>
                  );
                },
                th({ children }) {
                  return <th className="px-4 py-2 bg-gray-50 border-b border-gray-100 font-semibold text-gray-700">{children}</th>;
                },
                td({ children }) {
                  return <td className="px-4 py-2 border-b border-gray-50 last:border-0">{children}</td>;
                },
                a({ children, href }) {
                  return <a href={href} className="text-blue-600 hover:underline font-medium" target="_blank" rel="noopener noreferrer">{children}</a>;
                }
              }}
            >
              {message.content}
            </ReactMarkdown>
          )}
        </div>
      </div>
    </div>
  );
}
