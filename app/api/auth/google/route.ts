import { generateCodeVerifier, generateState } from 'arctic';
import { cookies } from 'next/headers';

import { google, scopes } from '@/lib/lucia/oauth';

const cookiesOptions = {
  path: '/',
  secure: process.env.NODE_ENV === 'production',
  httpOnly: true,
  maxAge: 60 * 10,
  sameSite: 'lax',
} as const;

export async function GET() {
  const state = generateState();
  const codeVerifier = generateCodeVerifier();

  const url = await google.createAuthorizationURL(state, codeVerifier, { scopes });
  url.searchParams.set('access_type', 'offline');

  cookies().set('google_oauth_state', state, cookiesOptions);
  cookies().set('google_oauth_code_verifier', codeVerifier, cookiesOptions);

  return Response.redirect(url);
}
