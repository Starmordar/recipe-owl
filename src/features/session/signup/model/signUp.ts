'use server';

import { generateIdFromEntropySize } from 'lucia';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Argon2id } from 'oslo/password';

import { lucia } from '@/src/entities/session/lucia';
import { prisma } from '@/src/shared/api/prisma-client';
import { publicUrls } from '@/src/shared/config/url';

import type { SignUpFormSchema } from './schema';

async function signUp(values: SignUpFormSchema): Promise<{ error: string }> {
  const exists = await prisma.user.findFirst({ where: { email: values.email } });
  if (exists) return { error: 'Sorry, that email address is already associated with an account.' };

  const hashedPassword = await new Argon2id().hash(values.password);
  const userId = generateIdFromEntropySize(10);

  await prisma.user.create({
    data: { id: userId, fullName: values.fullName, email: values.email, hashedPassword },
  });

  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

  redirect(publicUrls.profile);
}

export { signUp };
