'use server';

import { generateIdFromEntropySize } from 'lucia';
import { cookies } from 'next/headers';
import { getLocale } from 'next-intl/server';
import { Argon2id } from 'oslo/password';

import { authRedirectUrlKey } from '@/src/entities/session';
import { prisma } from '@/src/shared/api';
import { lucia } from '@/src/shared/api/auth';
import { publicUrls } from '@/src/shared/config/url';
import { redirect } from '@/src/shared/i18n/routing';

import type { FromValues } from '../model/schema';

async function signUp(values: FromValues): Promise<{ error: string }> {
  const exists = await prisma.user.findFirst({ where: { email: values.email } });
  if (exists) return { error: 'emailIsAlreadyInUse' };

  const hashedPassword = await new Argon2id().hash(values.password);
  const userId = generateIdFromEntropySize(10);

  await prisma.user.create({
    data: { id: userId, fullName: values.fullName, email: values.email, hashedPassword },
  });

  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  (await cookies()).set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

  const redirectUrl = (await cookies()).get(authRedirectUrlKey)?.value ?? publicUrls.home;
  const locale = await getLocale();
  redirect({ href: redirectUrl, locale });
}

export { signUp };
