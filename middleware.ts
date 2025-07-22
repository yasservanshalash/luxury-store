import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getAdminFromRequest } from '@/lib/auth'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Handle admin routes
  if (pathname.startsWith('/admin')) {
    // Allow access to login page
    if (pathname === '/admin' || pathname === '/admin/login') {
      return NextResponse.next()
    }

    // Check admin authentication for other admin pages
    const admin = getAdminFromRequest(request)
    if (!admin) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    // Admin is authenticated, allow access
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*']
} 