'use server';

import { generateCodeVerifier, generateState } from 'arctic';
import { cookies } from 'next/headers';

import { cookiesOptions } from '../../config/cookies';
import { google, scopes } from '../../lib/oauth';

async function redirectToGoogleURL() {
  const state = generateState();
  const codeVerifier = generateCodeVerifier();

  const url = await google.createAuthorizationURL(state, codeVerifier, { scopes });
  url.searchParams.set('access_type', 'offline');

  (await cookies()).set('google_oauth_state', state, cookiesOptions);
  (await cookies()).set('google_oauth_code_verifier', codeVerifier, cookiesOptions);

  return Response.redirect(url);
}

export { redirectToGoogleURL };
