import { prisma } from '@/prisma/prisma-client';
import { GetRecipesResponse } from '@/types/api';

export async function getRecipes(searchTerm: string): Promise<GetRecipesResponse> {
  const response = await fetch(`/api/recipes/?search=${searchTerm}`);
  const recipes = await response.json();

  return { recipes };
}

export async function getRecipesPreview(
  search: string,
  filters: Record<string, string | Array<string> | undefined>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> {
  const recipes = await prisma.recipe.findMany({ include: { ingredients: true } });
  console.log('search and filter', search, filters);

  return { recipes };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getRecipe(recipeId: number): Promise<any> {
  const recipe = prisma.recipe.findFirst({
    where: { id: recipeId },
    include: { ingredients: true },
  });

  return recipe;
}
