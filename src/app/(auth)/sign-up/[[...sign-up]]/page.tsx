'use client';

import React, { useState } from 'react';
import { Sparkles, Activity, ArrowRight, Loader2 } from 'lucide-react';
import { useAppAuth } from '@/providers/app-auth-provider';

export default function SignUpPage() {
  const { signIn } = useAppAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleSkip = async () => {
    setIsLoading(true);
    // Use the mock auth's dummy credentials
    await signIn('admin@example.com', 'password123');
  };

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
            <span>Local Development Mode</span>
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

      {/* Right Panel: Custom SignUp Form */}
      <div className="flex items-center justify-center p-6 lg:p-12">
        <div className="max-w-sm w-full space-y-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Create an Account</h2>
            <p className="text-sm text-muted-foreground mt-2">Sign up to your workspace to continue.</p>
          </div>

          <div className="flex flex-col gap-4">
            <button
              onClick={handleSkip}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 bg-[#030213] hover:bg-indigo-700 text-white py-2.5 px-4 rounded-lg font-medium transition-colors disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  Skip Login & Continue to Dashboard
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
            <p className="text-xs text-center text-muted-foreground">
              This will bypass authentication and log you in as a mock user for local development.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
