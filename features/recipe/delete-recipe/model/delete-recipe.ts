import { revalidatePath } from 'next/cache';

import { elastic } from '@/lib/elastic/setup';
import { prisma } from '@/prisma/prisma-client';
import { publicUrls } from '@/shared/config/url';

async function deleteRecipe(recipeId: number): Promise<void> {
  const recipe = await prisma.recipe.delete({ where: { id: recipeId } });

  await deleteRecipeIndex(recipe.id);

  revalidatePath(publicUrls.recipe(recipe.id));
  revalidatePath(publicUrls.recipes);
}

async function deleteRecipeIndex(recipeId: number) {
  await elastic.delete({ index: 'recipes', id: recipeId.toString() });
}

export { deleteRecipe, deleteRecipeIndex };
