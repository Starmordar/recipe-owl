'use server';

import { revalidatePath } from 'next/cache';

import { prisma } from '@/src/shared/api';
import { elastic } from '@/src/shared/api/elastic';
import { publicUrls } from '@/src/shared/config/url';

import { elasticIndexName } from '../config/elastic-index-name';

async function deleteRecipe(recipeId: number): Promise<void> {
  const recipe = await prisma.recipe.delete({ where: { id: recipeId } });

  await deleteRecipeIndex(recipe.id);

  revalidatePath(publicUrls.recipe(recipe.id));
  revalidatePath(publicUrls.recipes);
}

async function deleteRecipeIndex(recipeId: number) {
  await elastic.delete({ index: elasticIndexName, id: recipeId.toString() });
}

export { deleteRecipe };
