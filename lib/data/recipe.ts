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

export async function getRecipe(recipeId: number): Promise<RecipeDetails | null> {
  const recipe = prisma.recipe.findFirst({
    where: { id: recipeId },
    include: { ingredients: true },
  });

  return recipe;
}
