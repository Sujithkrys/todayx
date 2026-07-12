import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const CLERK_KEY = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/settings(.*)',
  '/profile(.*)',
]);

// Initialize Clerk middleware only if the publishable key is present
const clerkHandler = CLERK_KEY
  ? clerkMiddleware(async (auth, req) => {
      const authObj = await auth();
      if (!authObj.userId && isProtectedRoute(req)) {
        return authObj.redirectToSignIn({ returnBackUrl: req.url });
      }
    })
  : null;

export default function middleware(req: any, event: any) {
  if (clerkHandler) {
    return clerkHandler(req, event);
  }
  return NextResponse.next();
}

// 3. Configure matcher to ignore internals and static files
export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
    '/__clerk/(.*)',
  ],
};
