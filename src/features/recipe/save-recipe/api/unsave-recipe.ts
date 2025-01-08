'use server';

import invariant from 'tiny-invariant';

import { prisma } from '@/src/shared/api';
import { validateRequest } from '@/src/shared/api/auth';

async function unsaveRecipe(recipeId: number): Promise<void> {
  const { user } = await validateRequest();
  invariant(user, 'An authorized user is required');

  await prisma.savedRecipe.deleteMany({ where: { userId: user.id, recipeId } });
}

export { unsaveRecipe };
