import { prisma } from '@/prisma/prisma-client';

import type { RecipeDetails, RecipePreview } from '@/types/api';

export async function getRecipes(searchTerm: string): Promise<{ recipes: Array<RecipePreview> }> {
  const response = await fetch(`/api/recipes/?search=${searchTerm}`);
  const recipes = await response.json();

  return { recipes };
}

export async function getRecipesPreview(
  search: string,
  filters: Record<string, string | Array<string> | undefined>,
): Promise<{ recipes: Array<RecipePreview> }> {
  const recipes = await prisma.recipe.findMany();
  console.log('search and filter', search, filters);

  return { recipes };
}

export async function getRecipeDetails(recipeId: number): Promise<RecipeDetails | null> {
  const recipe = prisma.recipe.findFirst({
    where: { id: recipeId },
    include: { ingredients: true, user: true },
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
