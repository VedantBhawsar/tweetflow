import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    // Check if user is accessing protected routes
    if (req.nextUrl.pathname.startsWith('/dashboard')) {
      // Additional middleware logic for dashboard routes
      const token = req.nextauth.token;

      if (!token) {
        return NextResponse.redirect(new URL('/login', req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Public routes that don't require authentication
        const publicRoutes = ['/', '/login', '/register', '/terms', '/privacy'];

        if (publicRoutes.includes(req.nextUrl.pathname)) {
          return true;
        }

        // Protected routes require a valid token
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};