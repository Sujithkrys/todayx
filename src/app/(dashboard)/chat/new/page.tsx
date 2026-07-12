import React from 'react';
import { ChatLayout } from '@/features/chat/components/chat-layout';

export const metadata = {
  title: 'AI Chat - Voicera',
  description: 'Voicera Advanced AI Chat Interface',
};

export default function NewChatPage() {
  return (
    <div className="h-[calc(100vh-theme(spacing.16))] p-4 pb-0">
      <ChatLayout />
    </div>
  );
}
