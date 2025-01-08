'use server';

import { revalidatePath } from 'next/cache';
import invariant from 'tiny-invariant';

import { prisma } from '@/src/shared/api';
import { validateRequest } from '@/src/shared/api/auth';
import { publicUrls } from '@/src/shared/config/url';

async function saveRecipe(recipeId: number): Promise<void> {
  const { user } = await validateRequest();
  invariant(user, 'An authorized user is required');

  await prisma.savedRecipe.create({ data: { userId: user.id, recipeId } });
  revalidatePath(publicUrls.recipe(recipeId));
}

export { saveRecipe };
