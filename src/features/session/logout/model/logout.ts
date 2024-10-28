'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { validateRequest } from '@/src/entities/session';
import { lucia } from '@/src/entities/session/lucia';

import { publicUrls } from '@/src/shared/config/url';

async function signOut() {
  const { session } = await validateRequest();

  if (!session) redirect(publicUrls.signIn);

  await lucia.invalidateSession(session.id);
  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

  redirect(publicUrls.signIn);
}

export { signOut };
