'use server';

import { revalidatePath } from 'next/cache';

import { elastic, prisma } from '@/src/shared/api';
import { publicUrls } from '@/src/shared/config/url';

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
