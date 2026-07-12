'use client';

import * as React from 'react';
import { useAppAuth } from '@/providers/app-auth-provider';
import { Search, Bell } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';

export function Header() {
  const { user } = useAppAuth();

  return (
    <header className="h-16 border-b bg-card text-card-foreground flex items-center justify-between px-6 shadow-sm shrink-0">
      {/* Search Input Bar (Command-K Trigger Placeholder) */}
      <div className="flex items-center gap-2 max-w-md w-full relative">
        <Search className="absolute left-3 w-4 h-4 text-muted-foreground" />
        <button
          className="w-full flex items-center justify-between pl-10 pr-3 py-1.5 border rounded-lg bg-background text-sm text-muted-foreground hover:bg-muted/50 transition-all text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Search Workspace"
        >
          <span>Search workspace...</span>
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 border rounded bg-muted text-[10px] font-mono shadow-sm">
            <span>⌘</span>K
          </kbd>
        </button>
      </div>

      {/* Action items slot */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button
          className="p-2 rounded-md hover:bg-muted transition-colors relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="View notifications"
        >
          <Bell className="w-5 h-5 text-muted-foreground hover:text-foreground" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full" />
        </button>

        {/* Theme Switching Trigger */}
        <ThemeToggle />

        {/* User profile avatar */}
        <div className="flex items-center shrink-0">
          <div className="w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold flex items-center justify-center text-xs">
            {user?.firstName?.charAt(0) || 'U'}
          </div>
        </div>
      </div>
    </header>
  );
}

