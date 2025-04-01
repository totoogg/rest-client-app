import createIntlMiddleware from 'next-intl/middleware';
import { type NextRequest, NextResponse } from 'next/server';
import { routing } from '@/i18n/routing';

const intlMiddleware = createIntlMiddleware(routing);

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const locale = path.split('/')[1] || 'en';
  const pathWithoutLocale = path.replace(`/${locale}`, '') || '/';

  const isPublicPath = ['/auth/sign-in', '/auth/sign-up', '/'].includes(
    pathWithoutLocale
  );

  const token = request.cookies.get('authToken')?.value || '';

  if ((isPublicPath || token) && !path.startsWith(`/${locale}`)) {
    return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }

  if (!isPublicPath && !token && !path.includes('/auth')) {
    return NextResponse.redirect(
      new URL(`/${locale}/auth/sign-in`, request.url)
    );
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|trpc|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
