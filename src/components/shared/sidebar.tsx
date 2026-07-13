'use client';

import * as React from 'react';
import {
  Home,
  Inbox,
  Calendar,
  CheckSquare,
  Newspaper,
  Blocks,
  Bot,
  Settings,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Plus,
  History,
  LogOut,
  PanelLeftClose,
  BotMessageSquare
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUser, useClerk } from '@clerk/nextjs';

export function Sidebar() {
  const pathname = usePathname();
  const { user } = useUser();
  const { signOut } = useClerk();
  const [chatExpanded, setChatExpanded] = React.useState(true);

  return (
    <aside className="w-[260px] flex flex-col h-full bg-white border-r border-gray-100 text-gray-700 font-sans shadow-sm shrink-0">
      {/* Brand Section */}
      <div className="flex items-center justify-between p-4 px-5">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-md bg-[#1a1a1a] text-white flex items-center justify-center font-bold relative">
            <Sparkles className="w-3.5 h-3.5 absolute top-1 right-1 opacity-50" />
            <span className="text-xs">V</span>
          </div>
          <span className="font-semibold text-[15px] text-gray-900 tracking-tight">Voicera</span>
          <ChevronDown className="w-3.5 h-3.5 text-gray-400 ml-1" />
        </div>
        <button className="text-gray-400 hover:text-gray-600 transition-colors">
          <PanelLeftClose className="w-4 h-4" />
        </button>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto pt-2 pb-4">
        {/* Main Links */}
        <nav className="px-3 space-y-0.5">
          <Link href="/dashboard" className={cn("flex items-center gap-3 px-3 py-2 rounded-md text-[13px] font-medium transition-colors", pathname === '/dashboard' ? "bg-gray-100/70 text-gray-900" : "text-gray-600 hover:bg-gray-50")}>
            <Home className="w-[18px] h-[18px] stroke-[1.5]" />
            Dashboard
          </Link>
          <Link href="/dashboard/inbox" className={cn("flex items-center gap-3 px-3 py-2 rounded-md text-[13px] font-medium transition-colors", pathname === '/dashboard/inbox' ? "bg-gray-100/70 text-gray-900" : "text-gray-600 hover:bg-gray-50")}>
            <Inbox className="w-[18px] h-[18px] stroke-[1.5]" />
            Inbox
          </Link>
          <Link href="/dashboard/calendar" className={cn("flex items-center gap-3 px-3 py-2 rounded-md text-[13px] font-medium transition-colors", pathname === '/dashboard/calendar' ? "bg-gray-100/70 text-gray-900" : "text-gray-600 hover:bg-gray-50")}>
            <Calendar className="w-[18px] h-[18px] stroke-[1.5]" />
            Calendar
          </Link>
          <Link href="/dashboard/tasks" className={cn("flex items-center gap-3 px-3 py-2 rounded-md text-[13px] font-medium transition-colors", pathname === '/dashboard/tasks' ? "bg-gray-100/70 text-gray-900" : "text-gray-600 hover:bg-gray-50")}>
            <CheckSquare className="w-[18px] h-[18px] stroke-[1.5]" />
            Tasks
          </Link>
          <Link href="/dashboard/news" className={cn("flex items-center gap-3 px-3 py-2 rounded-md text-[13px] font-medium transition-colors", pathname === '/dashboard/news' ? "bg-gray-100/70 text-gray-900" : "text-gray-600 hover:bg-gray-50")}>
            <Newspaper className="w-[18px] h-[18px] stroke-[1.5]" />
            News
          </Link>

          {/* AI Chat Collapsible */}
          <div className="pt-1">
            <button
              onClick={() => setChatExpanded(!chatExpanded)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-md text-[13px] font-medium text-gray-600 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <BotMessageSquare className="w-[18px] h-[18px] stroke-[1.5]" />
                AI Chat
              </div>
              {chatExpanded ? <ChevronUp className="w-3.5 h-3.5 text-gray-400" /> : <ChevronDown className="w-3.5 h-3.5 text-gray-400" />}
            </button>
            {chatExpanded && (
              <div className="pl-9 space-y-0.5 mt-0.5">
                <Link href="/dashboard/chat/new" className={cn("flex items-center gap-2.5 px-3 py-1.5 text-[13px] transition-colors", pathname === '/dashboard/chat/new' ? "text-gray-900 font-semibold" : "text-gray-500 hover:text-gray-900")}>
                  <Plus className="w-3.5 h-3.5" />
                  New Chat
                </Link>
                <Link href="/dashboard/chat/history" className={cn("flex items-center gap-2.5 px-3 py-1.5 text-[13px] transition-colors", pathname === '/dashboard/chat/history' ? "text-gray-900 font-semibold" : "text-gray-500 hover:text-gray-900")}>
                  <History className="w-3.5 h-3.5" />
                  History
                </Link>
              </div>
            )}
          </div>
        </nav>

        {/* System Section */}
        <div className="px-6 mt-8 mb-2">
          <h3 className="text-[11px] font-bold text-gray-400 tracking-wider uppercase">System</h3>
        </div>
        <nav className="px-3 space-y-0.5">
          <Link href="/dashboard/integrations" className={cn("flex items-center gap-3 px-3 py-2 rounded-md text-[13px] font-medium transition-colors", pathname === '/dashboard/integrations' ? "bg-gray-100/70 text-gray-900" : "text-gray-600 hover:bg-gray-50")}>
            <Blocks className="w-[18px] h-[18px] stroke-[1.5]" />
            Integrations
          </Link>
          <Link href="/dashboard/agents" className={cn("flex items-center gap-3 px-3 py-2 rounded-md text-[13px] font-medium transition-colors", pathname === '/dashboard/agents' ? "bg-gray-100/70 text-gray-900" : "text-gray-600 hover:bg-gray-50")}>
            <Bot className="w-[18px] h-[18px] stroke-[1.5]" />
            AI Agents
          </Link>
          <Link href="/dashboard/settings" className={cn("flex items-center gap-3 px-3 py-2 rounded-md text-[13px] font-medium transition-colors", pathname === '/dashboard/settings' ? "bg-gray-100/70 text-gray-900" : "text-gray-600 hover:bg-gray-50")}>
            <Settings className="w-[18px] h-[18px] stroke-[1.5]" />
            Settings
          </Link>
        </nav>
      </div>

      {/* Footer Profile */}
      <div className="p-3 border-t border-gray-100">
        <div className="flex items-center justify-between px-3 py-2">
          <div className="flex items-center gap-2.5 truncate">
            <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-600 font-semibold flex items-center justify-center text-[10px] shrink-0">
              {user?.firstName?.charAt(0) || 'P'}
            </div>
            <span className="text-[13px] font-medium text-gray-700 truncate">
              {user?.fullName || 'Pavan Kumar'}
            </span>
          </div>
          <button onClick={() => signOut()} className="text-gray-400 hover:text-gray-700 transition-colors shrink-0">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}

