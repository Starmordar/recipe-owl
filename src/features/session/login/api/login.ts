'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Argon2id } from 'oslo/password';

import { authRedirectUrlKey } from '@/src/entities/session';
import { prisma } from '@/src/shared/api';
import { lucia } from '@/src/shared/api/auth';
import { publicUrls } from '@/src/shared/config/url';

import type { FormValues } from '../model/schema';

async function login(values: FormValues): Promise<{ error: string }> {
  const user = await prisma.user.findUnique({ where: { email: values.email } });
  if (!user || !user.hashedPassword) return { error: 'Incorrect username or password' };

  const validPassword = await new Argon2id().verify(user.hashedPassword, values.password);
  if (!validPassword) return { error: 'Incorrect username or password' };

  const session = await lucia.createSession(user.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

  const redirectUrl = cookies().get(authRedirectUrlKey)?.value ?? publicUrls.home;
  redirect(redirectUrl);
}

export { login };
