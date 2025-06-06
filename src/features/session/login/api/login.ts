'use server';

import { cookies } from 'next/headers';
import { getLocale } from 'next-intl/server';
import { Argon2id } from 'oslo/password';

import { authRedirectUrlKey } from '@/src/entities/session';
import { prisma } from '@/src/shared/api';
import { lucia } from '@/src/shared/api/auth';
import { publicUrls } from '@/src/shared/config/url';
import { redirect } from '@/src/shared/i18n/routing';

import type { FormValues } from '../model/schema';

async function login(values: FormValues): Promise<{ error: string }> {
  const user = await prisma.user.findUnique({ where: { email: values.email } });
  if (!user || !user.hashedPassword) return { error: 'incorrectData' };

  const validPassword = await new Argon2id().verify(user.hashedPassword, values.password);
  if (!validPassword) return { error: 'incorrectData' };

  const session = await lucia.createSession(user.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  (await cookies()).set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

  const redirectUrl = (await cookies()).get(authRedirectUrlKey)?.value ?? publicUrls.home;
  const locale = await getLocale();
  redirect({ href: redirectUrl, locale });
}

export { login };
