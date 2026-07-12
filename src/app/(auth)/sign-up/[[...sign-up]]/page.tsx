import React from 'react';
import { SignUp } from '@clerk/nextjs';
import { Sparkles, Activity } from 'lucide-react';

export default function SignUpPage() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-background">
      {/* Left Panel: Hero Panel matching design system */}
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
            <span>Secure Clerk Auth Active</span>
          </div>
          <h1 className="text-4xl font-medium tracking-tight text-white leading-tight">
            Get started<br />
            <span className="text-white/60">in under an hour.</span>
          </h1>
          <p className="text-sm text-white/50 leading-relaxed">
            Create an account to deploy your first workspace, launch automation agents, and organize your daily metrics.
          </p>
        </div>

        <div className="text-xs text-white/40 relative z-10">
          &copy; {new Date().getFullYear()} Databolt Inc. All rights reserved.
        </div>
      </div>

      {/* Right Panel: Clerk SignUp Form */}
      <div className="flex items-center justify-center p-6 lg:p-12">
        <SignUp
          appearance={{
            elements: {
              card: 'border-0 shadow-none bg-transparent',
              headerTitle: 'text-2xl font-bold text-foreground',
              headerSubtitle: 'text-muted-foreground',
              socialButtonsBlockButton: 'border hover:bg-muted/50 text-foreground transition-all',
              formButtonPrimary: 'bg-[#030213] text-white hover:bg-indigo-700 transition-colors',
              footerActionLink: 'text-indigo-600 hover:text-indigo-500',
            },
          }}
        />
      </div>
    </div>
  );
}
