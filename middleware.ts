import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const session = request.cookies.get('session')
  const { pathname } = request.nextUrl

  // Pages privées qui demandent une connexion
  const isProtectedRoute = pathname.startsWith('/dashboard') || pathname.startsWith('/upload')

  // Si l'utilisateur n'est pas connecté et tente d'entrer
  if (!session && isProtectedRoute) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

// On surveille uniquement les pages sensibles
export const config = {
  matcher: ['/dashboard/:path*', '/upload/:path*'],
}