'use server';

import { generateIdFromEntropySize } from 'lucia';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Argon2id } from 'oslo/password';

import { authRedirectUrlKey } from '@/src/entities/session';
import { prisma } from '@/src/shared/api';
import { lucia } from '@/src/shared/api/auth';
import { publicUrls } from '@/src/shared/config/url';

import type { FromValues } from '../model/schema';

async function signUp(values: FromValues): Promise<{ error: string }> {
  const exists = await prisma.user.findFirst({ where: { email: values.email } });
  if (exists) return { error: 'This email address is already in use. Please try another one.' };

  const hashedPassword = await new Argon2id().hash(values.password);
  const userId = generateIdFromEntropySize(10);

  await prisma.user.create({
    data: { id: userId, fullName: values.fullName, email: values.email, hashedPassword },
  });

  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

  const redirectUrl = cookies().get(authRedirectUrlKey)?.value ?? publicUrls.home;
  redirect(redirectUrl);
}

export { signUp };
