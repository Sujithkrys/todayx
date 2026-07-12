import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const CLERK_KEY = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

// 1. Define the routes we want to protect (SaaS dashboard + settings)
const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/settings(.*)',
  '/profile(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  // If Clerk is not set up, completely bypass middleware route protection
  if (!CLERK_KEY) {
    return NextResponse.next();
  }

  // 2. Protect matching routes by redirecting unauthenticated users to sign-in page
  const authObj = await auth();
  if (!authObj.userId && isProtectedRoute(req)) {
    return authObj.redirectToSignIn({ returnBackUrl: req.url });
  }
});

// 3. Configure matcher to ignore internals and static files
export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
    '/__clerk/(.*)',
  ],
};
