import React from 'react';
import { ChatLayout } from '@/features/chat/components/chat-layout';

export const metadata = {
  title: 'Chat History - Voicera',
  description: 'Voicera Advanced AI Chat History',
};

export default function ChatHistoryPage() {
  return (
    <div className="h-[calc(100vh-theme(spacing.16))] p-4 pb-0">
      <ChatLayout />
    </div>
  );
}
