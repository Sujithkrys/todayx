'use client';

import React from 'react';
import { SignIn } from '@clerk/nextjs';
import { Activity, Sparkles } from 'lucide-react';

export default function SignInPage() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-background">
      {/* Left Panel */}
      <div className="hidden lg:flex flex-col justify-between p-12 bg-[#030213] relative overflow-hidden text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.15),transparent_60%)] pointer-events-none" />
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(rgba(255,255,255,0.15)_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <div className="flex items-center gap-2 relative z-10">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
            <Activity className="w-4.5 h-4.5 text-white" />
          </div>
          <span className="font-semibold text-lg tracking-tight">Databolt</span>
        </div>

        <div className="space-y-4 relative z-10 max-w-md">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-indigo-200">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Secure Authentication</span>
          </div>
          <h1 className="text-4xl font-medium tracking-tight text-white leading-tight">
            Your personal workspace.<br />
            <span className="text-white/60">Limitless performance.</span>
          </h1>
          <p className="text-sm text-white/50 leading-relaxed">
            Manage your AI agents, connected integrations, and tasks inside our unified control center.
          </p>
        </div>

        <div className="text-xs text-white/40 relative z-10">
          &copy; {new Date().getFullYear()} Databolt Inc. All rights reserved.
        </div>
      </div>

      {/* Right Panel: Clerk SignIn Form */}
      <div className="flex items-center justify-center p-6 lg:p-12">
        <SignIn 
          appearance={{
            elements: {
              formButtonPrimary: 'bg-indigo-600 hover:bg-indigo-700 text-sm normal-case',
            }
          }}
        />
      </div>
    </div>
  );
}
