'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppAuth } from '@/providers/app-auth-provider';
import {
  LayoutDashboard,
  MessageSquare,
  Mail,
  Calendar as CalendarIcon,
  CheckSquare,
  FileText,
  Boxes,
  Cpu,
  Settings as SettingsIcon,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Sparkles,
  LogOut,
  ChevronDown
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const SIDEBAR_ITEMS: SidebarItem[] = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'AI Chat', href: '/dashboard/chat', icon: MessageSquare },
  { name: 'Inbox', href: '/dashboard/inbox', icon: Mail },
  { name: 'Calendar', href: '/dashboard/calendar', icon: CalendarIcon },
  { name: 'Tasks', href: '/dashboard/tasks', icon: CheckSquare },
  { name: 'News', href: '/dashboard/news', icon: FileText },
  { name: 'Integrations', href: '/dashboard/integrations', icon: Boxes },
  { name: 'AI Agents', href: '/dashboard/agents', icon: Cpu },
  { name: 'Settings', href: '/dashboard/settings', icon: SettingsIcon },
];

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);
  const [workspaceMenuOpen, setWorkspaceMenuOpen] = React.useState(false);
  const pathname = usePathname();
  const { user, signOut } = useAppAuth();

  // Listen to keyboard shortcut (Ctrl + B) to toggle sidebar collapse
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'b') {
        e.preventDefault();
        setIsCollapsed((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);
  const toggleMobile = () => setIsMobileOpen(!isMobileOpen);

  return (
    <>
      {/* Mobile Header Trigger */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b bg-card text-card-foreground">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold">
            V
          </div>
          <span className="font-semibold text-sm">Voicera</span>
        </div>
        <button
          onClick={toggleMobile}
          className="p-2 rounded-md hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Backdrop for Mobile */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleMobile}
            className="lg:hidden fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Main Sidebar Shell */}
      <motion.aside
        aria-label="Application Navigation"
        animate={{ width: isCollapsed ? 72 : 240 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        className={cn(
          'fixed inset-y-0 left-0 z-50 lg:static flex flex-col h-full bg-card border-r text-card-foreground shadow-sm',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Sidebar Header / Brand Selector */}
        <div className="flex items-center justify-between p-4 border-b relative">
          <div className="flex items-center gap-2.5 overflow-hidden w-full">
            <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            {!isCollapsed && (
              <div className="flex items-center justify-between w-full overflow-hidden">
                <div className="flex flex-col text-left">
                  <span className="font-semibold text-sm tracking-tight truncate">Voicera</span>
                  <span className="text-[10px] text-muted-foreground truncate">Personal Workspace</span>
                </div>
                <button
                  onClick={() => setWorkspaceMenuOpen(!workspaceMenuOpen)}
                  className="p-1 rounded-md hover:bg-muted ml-auto shrink-0"
                >
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            )}
          </div>

          {/* Collapse Button (Desktop Only) */}
          <button
            onClick={toggleCollapse}
            className="hidden lg:flex absolute top-1/2 -right-3 -translate-y-1/2 w-6 h-6 rounded-full border bg-card text-muted-foreground hover:text-foreground items-center justify-center shadow-sm"
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {SIDEBAR_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.name} href={item.href} className="block">
                <span
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group relative',
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/80'
                  )}
                >
                  <item.icon className="w-5 h-5 shrink-0" />
                  {!isCollapsed && <span className="truncate">{item.name}</span>}
                  
                  {/* Tooltip on Collapsed State */}
                  {isCollapsed && (
                    <span className="absolute left-16 hidden group-hover:block bg-popover text-popover-foreground border px-2 py-1 text-xs rounded-md shadow-md z-50 whitespace-nowrap">
                      {item.name}
                    </span>
                  )}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer / User Info */}
        <div className="p-3 border-t mt-auto">
          <div className="flex items-center gap-3 p-1.5 rounded-lg hover:bg-muted/50 transition-colors">
            {user?.imageUrl ? (
              <img
                src={user.imageUrl}
                alt={user.fullName || 'User Profile'}
                className="w-8 h-8 rounded-full object-cover shrink-0"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold flex items-center justify-center shrink-0">
                {user?.firstName?.charAt(0) || 'U'}
              </div>
            )}
            {!isCollapsed && (
              <div className="flex flex-col text-left truncate flex-1">
                <span className="text-xs font-semibold truncate">
                  {user?.fullName || 'Active User'}
                </span>
                <span className="text-[10px] text-muted-foreground truncate">
                  {user?.email || 'user@email.com'}
                </span>
              </div>
            )}
            {!isCollapsed && (
              <button
                onClick={() => signOut()}
                className="p-1 rounded-md hover:bg-muted text-muted-foreground hover:text-destructive shrink-0"
                aria-label="Sign out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </motion.aside>
    </>
  );
}
