import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Protect these route prefixes. Requests to these paths require an authenticated session cookie.
const PROTECTED_PREFIXES = [
  '/dashboard',
  '/attendance',
  '/reading',
  '/api/attendance',
  '/api/me',
  '/api/submissions',
  '/api/assignments'
]

function isProtected(pathname: string){
  return PROTECTED_PREFIXES.some(p => pathname === p || pathname.startsWith(p + '/'))
}

function hasAuthCookie(req: NextRequest){
  // NextAuth session cookie names vary by platform; check common names.
  const cookie = req.cookies.get('next-auth.session-token') || req.cookies.get('__Secure-next-auth.session-token')
  return !!cookie
}

export function middleware(req: NextRequest){
  const { pathname } = req.nextUrl

  // Allow Next.js internals and static files
  if (pathname.startsWith('/_next') || pathname.startsWith('/static') || pathname === '/favicon.ico') {
    return NextResponse.next()
  }

  // If route is protected, require auth
  if (isProtected(pathname)){
    if (!hasAuthCookie(req)){
      const signInUrl = new URL('/auth/signin', req.url)
      signInUrl.searchParams.set('callbackUrl', req.nextUrl.pathname + (req.nextUrl.search || ''))
      return NextResponse.redirect(signInUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/attendance/:path*', '/reading/:path*', '/api/attendance', '/api/me', '/api/submissions', '/api/assignments']
}
