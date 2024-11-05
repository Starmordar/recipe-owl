import { NextResponse } from 'next/server';

import { shareTokenCookieName } from './src/entities/cart/config/share-token';
import { authRedirectUrlKey } from './src/entities/session';
import { publicUrls } from './src/shared/config/url';

import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const authUrls = [publicUrls.recipes, publicUrls.profile];

  if (authUrls.some(url => pathname.startsWith(url)) || pathname === publicUrls.home) {
    const response = NextResponse.next();
    response.cookies.set(authRedirectUrlKey, pathname, { path: '/', secure: true });
    return response;
  }

  if (request.nextUrl.pathname.startsWith(publicUrls.cart)) {
    const { searchParams } = request.nextUrl;
    const shareToken = searchParams.get('shareToken');

    console.log(request.nextUrl, pathname);
    if (shareToken) {
      const response = NextResponse.next();

      response.cookies.set(shareTokenCookieName, shareToken, { path: '/', secure: true });
      response.cookies.set(authRedirectUrlKey, `${pathname}${search}`, { path: '/', secure: true });

      return response;
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'],
};
