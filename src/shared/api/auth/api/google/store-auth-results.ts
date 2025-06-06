'use server';

import { OAuth2RequestError } from 'arctic';
import { generateIdFromEntropySize } from 'lucia';
import { cookies } from 'next/headers';

import { authRedirectUrlKey } from '@/src/entities/session';
import { prisma } from '@/src/shared/api';
import { publicUrls } from '@/src/shared/config/url';

import { lucia } from '../../lib/lucia';
import { google } from '../../lib/oauth';

import type { GoogleUser } from './types';

async function storeAuthResults(request: Request): Promise<Response> {
  const url = new URL(request.url);

  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');

  const storedState = (await cookies()).get('google_oauth_state')?.value;
  const storedCodeVerifier = (await cookies()).get('google_oauth_code_verifier')?.value;

  const redirectUrl = (await cookies()).get(authRedirectUrlKey)?.value ?? publicUrls.home;

  if (!code || !state || !storedState || !storedCodeVerifier || state !== storedState) {
    return new Response(null, { status: 400 });
  }

  try {
    const tokens = await google.validateAuthorizationCode(code, storedCodeVerifier);

    const googleUserResponse = await fetch('https://www.googleapis.com/oauth2/v1/userinfo', {
      headers: { Authorization: `Bearer ${tokens.accessToken}` },
    });
    const googleUser: GoogleUser = await googleUserResponse.json();
    const existingUser = await prisma.user.findFirst({ where: { email: googleUser.email } });

    if (existingUser) {
      await prisma.user.update({
        where: { email: googleUser.email },
        data: {
          fullName: googleUser.name,
          picture: googleUser.picture,
          provider: 'google',
          providerId: googleUser.id,
        },
      });

      const session = await lucia.createSession(existingUser.id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);

      (await cookies()).set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
      return new Response(null, { status: 302, headers: { Location: redirectUrl } });
    }

    const userId = generateIdFromEntropySize(10);
    await prisma.user.create({
      data: {
        id: userId,
        fullName: googleUser.name,
        email: googleUser.email,
        picture: googleUser.picture,
        provider: 'google',
        providerId: googleUser.id,
      },
    });

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    (await cookies()).set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

    return new Response(null, { status: 302, headers: { Location: redirectUrl } });
  } catch (e) {
    if (e instanceof OAuth2RequestError) return new Response(null, { status: 400 });
    return new Response(null, { status: 500 });
  }
}

export { storeAuthResults };
