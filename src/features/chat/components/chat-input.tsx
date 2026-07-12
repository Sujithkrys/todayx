import React, { FormEvent, useRef, useEffect } from 'react';
import { Send, Square, Paperclip, Mic } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatInputProps {
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  stop: () => void;
}

export function ChatInput({ input, handleInputChange, handleSubmit, isLoading, stop }: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [input]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (input.trim()) {
        handleSubmit(e as unknown as FormEvent<HTMLFormElement>);
      }
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="relative flex items-end p-2 bg-gray-50 border border-gray-100 rounded-2xl shadow-sm focus-within:ring-2 focus-within:ring-gray-200 focus-within:bg-white transition-all duration-200"
    >
      <div className="flex items-center gap-1 pb-1 pl-1">
        <button type="button" className="p-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors" title="Attach file">
          <Paperclip className="w-4.5 h-4.5" />
        </button>
      </div>

      <textarea
        ref={textareaRef}
        value={input}
        onChange={handleInputChange}
        onKeyDown={onKeyDown}
        placeholder="Message Voicera AI..."
        className="w-full max-h-[200px] bg-transparent border-0 focus:ring-0 resize-none py-3 px-3 text-[14px] text-gray-900 placeholder:text-gray-400 leading-relaxed"
        rows={1}
      />

      <div className="flex items-center gap-1 pb-1 pr-1">
        {isLoading ? (
          <button 
            type="button"
            onClick={stop}
            className="p-2 rounded-xl bg-gray-900 text-white hover:bg-gray-800 transition-colors shadow-sm"
            title="Stop generating"
          >
            <Square className="w-4.5 h-4.5 fill-current" />
          </button>
        ) : input.trim() ? (
          <button 
            type="submit"
            className="p-2 rounded-xl bg-gray-900 text-white hover:bg-gray-800 transition-colors shadow-sm"
            title="Send message"
          >
            <Send className="w-4.5 h-4.5" />
          </button>
        ) : (
          <button type="button" className="p-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors" title="Voice input">
            <Mic className="w-4.5 h-4.5" />
          </button>
        )}
      </div>
    </form>
  );
}
