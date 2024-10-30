'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Argon2id } from 'oslo/password';

import { prisma } from '@/src/shared/api';
import { lucia } from '@/src/shared/api/auth';
import { publicUrls } from '@/src/shared/config/url';

import type { LoginFormSchema } from './schema';

async function login(values: LoginFormSchema): Promise<{ error: string }> {
  const user = await prisma.user.findUnique({ where: { email: values.email } });
  if (!user) return { error: 'Incorrect username' };
  if (!user.hashedPassword)
    return { error: 'This email is linked to a Google account. Please log in with Google.' };

  const validPassword = await new Argon2id().verify(user.hashedPassword, values.password);
  if (!validPassword) return { error: 'Incorrect password' };

  const session = await lucia.createSession(user.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

  redirect(publicUrls.profile);
}

export { login };
