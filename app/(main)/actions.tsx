import { prisma } from '@/prisma/prisma-client';

import type { LatestRecipe, RecipeDetails } from '@/types/api';

async function getTodaysRecipe(): Promise<RecipeDetails | null> {
  const recipe = await prisma.recipe.findFirst({
    include: { ingredients: { orderBy: { order: 'asc' } }, user: true },
  });

  return recipe;
}

async function getLatestRecipes(): Promise<Array<LatestRecipe>> {
  const recipes = await prisma.recipe.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
    include: { user: true },
  });

  return recipes;
}

async function getMostPopularRecipes(): Promise<Array<LatestRecipe>> {
  const recipes = await prisma.recipe.findMany({
    orderBy: { createdAt: 'asc' },
    take: 5,
    include: { user: true },
  });

  return recipes;
}

export { getTodaysRecipe, getLatestRecipes, getMostPopularRecipes };
