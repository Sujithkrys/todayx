import React from 'react';
import { ChatLayout } from '@/features/chat/components/chat-layout';
import { redirect } from 'next/navigation';

export default function ChatIndexPage() {
  // Redirect root chat to new
  redirect('/dashboard/chat/new');
}
