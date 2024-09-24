import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const shareToken = searchParams.get('shareToken');

  if (shareToken) {
    const response = NextResponse.next();
    response.cookies.set('shareToken', shareToken, { path: '/', secure: true });
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/cart'],
};
