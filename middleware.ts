import createMiddleware from 'next-intl/middleware';

import { shareTokenCookieName } from './src/entities/cart/config/share-token';
import { authRedirectUrlKey } from './src/entities/session';
import { publicUrls } from './src/shared/config/url';
import { i18nConfig } from './src/shared/i18n/config';

import type { NextRequest } from 'next/server';

const authUrls = [publicUrls.recipes, publicUrls.profile];

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const [, locale, ...segments] = pathname.split('/');
  const segmentsUrl = `/${segments.join('/')}`;

  const handleI18nRouting = createMiddleware(i18nConfig);

  if (authUrls.some(url => segmentsUrl.startsWith(url)) || segmentsUrl === publicUrls.home) {
    const response = handleI18nRouting(request);
    response.cookies.set(authRedirectUrlKey, pathname, { path: '/', secure: true });
    return response;
  }

  if (segmentsUrl.startsWith(publicUrls.cart)) {
    const { searchParams } = request.nextUrl;
    const shareToken = searchParams.get('shareToken');

    if (shareToken) {
      const response = handleI18nRouting(request);
      response.cookies.set(shareTokenCookieName, shareToken, { path: '/', secure: true });
      response.cookies.set(authRedirectUrlKey, `${pathname}${search}`, { path: '/', secure: true });
      return response;
    }

    return handleI18nRouting(request);
  }

  return handleI18nRouting(request);
}

export const config = {
  matcher: ['/', '/([\\w-]+)?/(cart|profile)', '/([\\w-]+)?/recipes/(.+)', '/(ru|en)/:path*'],
};
