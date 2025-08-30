// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Allow the login page itself
  if (pathname === '/admin/login') {
    return NextResponse.next();
  }

  // For any /admin/* path, require the cookie set on login
  if (pathname.startsWith('/admin')) {
    const hasSession = request.cookies.get('adminSession');
    if (!hasSession) {
      const url = request.nextUrl.clone();
      url.pathname = '/admin/login';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
