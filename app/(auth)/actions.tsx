'use server';

import { generateIdFromEntropySize } from 'lucia';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Argon2id } from 'oslo/password';
import { cache } from 'react';

import { lucia } from '@/lib/lucia';
import { prisma } from '@/prisma/prisma-client';

import type { FormValues as SignInFormValues } from '@/components/signin-form/constants/schema';
import type { FormValues as SignUpFormValues } from '@/components/signup-form/constants/schema';
import type { Session, User } from 'lucia';

interface ActionResult {
  error: string;
}

export async function signUp(values: SignUpFormValues): Promise<ActionResult> {
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

  redirect('/recipes');
}

export async function signIn(values: SignInFormValues) {
  const user = await prisma.user.findUnique({ where: { email: values.email } });
  if (!user) return { error: 'Incorrect username' };

  const validPassword = await new Argon2id().verify(user.hashedPassword, values.password);
  if (!validPassword) return { error: 'Incorrect password' };

  const session = await lucia.createSession(user.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

  redirect('/recipes');
}

export const validateRequest = cache(
  async (): Promise<{ user: User; session: Session } | { user: null; session: null }> => {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
    if (!sessionId) return { user: null, session: null };

    const result = await lucia.validateSession(sessionId);

    try {
      if (result.session && result.session.fresh) {
        const sessionCookie = lucia.createSessionCookie(result.session.id);
        cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
      }

      if (!result.session) {
        const sessionCookie = lucia.createBlankSessionCookie();
        cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
      }
    } catch {}

    return result;
  },
);

export async function signOut() {
  const { session } = await validateRequest();

  if (!session) redirect('/sign-in');

  await lucia.invalidateSession(session.id);
  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

  redirect('/sign-in');
}
