'use server';

import { revalidatePath } from 'next/cache';
import invariant from 'tiny-invariant';

import { prisma } from '@/src/shared/api';
import { validateRequest } from '@/src/shared/api/auth';
import { elastic } from '@/src/shared/api/elastic';
import { publicUrls } from '@/src/shared/config/url';

import { elasticIndexName } from '../config/elastic-index-name';

async function deleteRecipe(recipeId: number): Promise<void> {
  const { user } = await validateRequest();
  invariant(user, 'An authorized user is required');

  const existingRecipe = await prisma.recipe.findFirst({
    where: { id: recipeId, createdById: user.id },
    select: { id: true },
  });
  invariant(existingRecipe, 'Only the recipe author can delete it');

  const recipe = await prisma.recipe.delete({ where: { id: recipeId } });

  await deleteRecipeIndex(recipe.id);

  revalidatePath(publicUrls.recipe(recipe.id));
  revalidatePath(publicUrls.recipes);
}

async function deleteRecipeIndex(recipeId: number) {
  await elastic.delete({ index: elasticIndexName, id: recipeId.toString() });
}

export { deleteRecipe };
