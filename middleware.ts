import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken } from '@/lib/auth'

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value

  // Protected routes
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin')
  const isDriverRoute = request.nextUrl.pathname.startsWith('/driver')
  const isDashboardRoute = request.nextUrl.pathname.startsWith('/dashboard')
  const isAuthRoute = request.nextUrl.pathname.startsWith('/login') || 
                      request.nextUrl.pathname.startsWith('/register')

  // If no token and trying to access protected routes, redirect to login
  if (!token && (isAdminRoute || isDriverRoute || isDashboardRoute)) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // If token exists, verify it
  if (token) {
    const session = await verifyToken(token)

    // If on auth routes with valid token, redirect to appropriate dashboard
    if (isAuthRoute && session) {
      if (session.role === 'Admin') {
        return NextResponse.redirect(new URL('/admin', request.url))
      } else if (session.role === 'Driver') {
        return NextResponse.redirect(new URL('/driver/dashboard', request.url))
      } else {
        return NextResponse.redirect(new URL('/dashboard', request.url))
      }
    }

    // Check role-based access
    if (session) {
      if (isAdminRoute && session.role !== 'Admin') {
        return NextResponse.redirect(new URL('/dashboard', request.url))
      }
      if (isDriverRoute && session.role !== 'Driver') {
        return NextResponse.redirect(new URL('/dashboard', request.url))
      }
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/driver/:path*', '/dashboard/:path*', '/login', '/register']
}