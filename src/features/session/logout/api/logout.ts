'use server';

import { cookies } from 'next/headers';
import { getLocale } from 'next-intl/server';

import { validateRequest, lucia } from '@/src/shared/api/auth';
import { publicUrls } from '@/src/shared/config/url';
import { redirect } from '@/src/shared/i18n/routing';

async function signOut() {
  const { session } = await validateRequest();
  const locale = await getLocale();

  if (!session) redirect({ href: publicUrls.signIn, locale });

  await lucia.invalidateSession(session.id);
  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

  redirect({ href: publicUrls.signIn, locale });
}

export { signOut };
