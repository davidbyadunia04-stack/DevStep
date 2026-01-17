import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // 1. On vérifie si l'utilisateur est connecté (badge de session)
  // On cherche le cookie créé par Supabase ou ton système d'auth
  const session = request.cookies.get('sb-access-token') || request.cookies.get('session');

  const { pathname } = request.nextUrl;

  // 2. Si l'utilisateur n'est PAS connecté
  if (!session) {
    // Et qu'il essaie d'aller sur une page privée
    if (pathname.startsWith('/upload') || pathname.startsWith('/dashboard')) {
      // On le redirige vers la page de connexion
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // 3. Si l'utilisateur EST connecté, on l'empêche d'aller sur login/register
  if (session && (pathname === '/login' || pathname === '/register')) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

// On définit les routes que le garde du corps doit surveiller
export const config = {
  matcher: ['/dashboard/:path*', '/upload/:path*', '/login', '/register'],
}