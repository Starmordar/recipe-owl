import { prisma } from '@/prisma/prisma-client';

import { searchRecipes } from './recipes-search';

import type { RecipeDetails, RecipePreview, RecipeSearchResult } from '@/types/api';

export async function getRecipesPreview(
  searchTerm: string,
  filters: Record<string, string | Array<string> | undefined>,
): Promise<Array<RecipeSearchResult>> {
  // TODO: retrive list of liked recipes (ids) and then pass those ids to the search
  return searchRecipes(searchTerm, filters);
}

export async function getRecipeDetails(recipeId: number): Promise<RecipeDetails | null> {
  const recipe = await prisma.recipe.findFirst({
    where: { id: recipeId },
    include: { ingredients: { orderBy: { order: 'asc' } }, user: true },
  });

  return recipe;
}

export async function savedRecipes(userId: string): Promise<Array<RecipePreview>> {
  const response = await prisma.savedRecipe.findMany({
    where: { userId },
    include: { recipe: true },
  });

  if (response === null) return [];
  return response.map(({ recipe }) => recipe);
}

export async function isRecipeSaved(
  userId: string | undefined,
  recipeId: number,
): Promise<boolean> {
  if (!userId) return false;

  const savedRecipe = await prisma.savedRecipe.findFirst({
    where: { userId, recipeId },
  });

  return !!savedRecipe;
}
