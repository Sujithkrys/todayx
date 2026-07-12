import React from 'react';
import { InboxLayout } from '@/features/inbox/components/inbox-layout';

export const metadata = {
  title: 'Inbox - Voicera',
  description: 'Manage your Gmail inbox directly inside Voicera',
};

export default function InboxPage() {
  return (
    <div className="h-[calc(100vh-theme(spacing.16))] p-4 pb-0">
      <InboxLayout />
    </div>
  );
}
