'use client';

import React from 'react';
import { useChat } from '@ai-sdk/react';
import { ChatMessage } from './chat-message';
import { ChatInput } from './chat-input';
import { Bot, MessageSquarePlus } from 'lucide-react';

export function ChatInterface() {
  const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL || '';
  const apiEndpoint = convexUrl ? convexUrl.replace('.cloud', '.site') + '/api/chat' : '/api/chat';

  const { messages, input, handleInputChange, handleSubmit, isLoading, stop } = useChat({
    api: apiEndpoint,
    initialMessages: [],
  });

  const chatContainerRef = React.useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  React.useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const suggestedPrompts = [
    "What tasks are assigned to me today?",
    "Summarize the latest AI agent execution logs.",
    "Draft a professional email to a client about their scheduled call.",
    "How do I connect a new Slack workspace?"
  ];

  return (
    <div className="flex flex-col h-full bg-white relative">
      
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-white/50 backdrop-blur-sm z-10 sticky top-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-500">
            <Bot className="w-4.5 h-4.5" />
          </div>
          <div>
            <h2 className="font-semibold text-[15px] text-gray-900 leading-none">Voicera AI</h2>
            <p className="text-[11px] text-gray-400 mt-0.5">Using GPT-4o-Mini • Fast Response</p>
          </div>
        </div>
        <button 
          onClick={() => window.location.reload()}
          className="p-2 rounded-md hover:bg-gray-50 text-gray-400 hover:text-gray-700 transition-colors"
          title="New Chat"
        >
          <MessageSquarePlus className="w-4.5 h-4.5" />
        </button>
      </div>

      {/* Chat Area */}
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 scroll-smooth"
      >
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center max-w-2xl mx-auto space-y-8 animate-in fade-in duration-700">
            <div className="w-16 h-16 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400">
              <Bot className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight text-center">
              How can I help you today?
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-xl">
              {suggestedPrompts.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleInputChange({ target: { value: prompt } } as any)}
                  className="p-3.5 text-left rounded-xl border border-gray-100 bg-white hover:bg-gray-50 transition-colors text-[13px] text-gray-600 font-medium"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto space-y-6 pb-20">
            {messages.map((m) => (
              <ChatMessage key={m.id} message={m} />
            ))}
            {isLoading && messages[messages.length - 1]?.role === 'user' && (
              <div className="flex items-center gap-2 text-gray-400 text-sm p-4">
                <Bot className="w-4 h-4 animate-pulse" />
                <span className="animate-pulse">Voicera is thinking...</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-gradient-to-t from-white via-white to-transparent">
        <div className="max-w-3xl mx-auto">
          <ChatInput 
            input={input} 
            handleInputChange={handleInputChange} 
            handleSubmit={handleSubmit} 
            isLoading={isLoading}
            stop={stop}
          />
        </div>
      </div>
    </div>
  );
}
