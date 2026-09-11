import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from '@/i18n/request';
import { getToken } from 'next-auth/jwt';

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
});

// Routes that can be viewed without authentication
const PUBLIC_PATHS = [
  '/auth/signin',
  '/auth/signup',
  '/privacy',
  '/api',
  '/_next',
  '/favicon.ico',
];

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Let intl handle language redirection first
  const response = intlMiddleware(req);

  // Strip locale prefix from pathname to check protected routes
  // e.g. /ru/courses -> /courses, /ru -> /
  const pathWithoutLocale = pathname.replace(/^\/(ru|en)/, '') || '/';

  const isPublic = PUBLIC_PATHS.some((p) => pathWithoutLocale.startsWith(p));

  if (!isPublic) {
    // Check if user is authenticated via NextAuth JWT
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET || 'dev-secret-key-not-for-production',
    });

    if (!token) {
      // Determine locale or fallback to default
      const match = pathname.match(/^\/(ru|en)/);
      const currentLocale = match ? match[1] : defaultLocale;
      const signInUrl = new URL(`/${currentLocale}/auth/signin`, req.url);
      signInUrl.searchParams.set('callbackUrl', req.nextUrl.pathname + req.nextUrl.search);
      return NextResponse.redirect(signInUrl);
    }
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|logo.jpg|.*\\..*).*)'],
};

