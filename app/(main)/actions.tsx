import { revalidatePath } from 'next/cache';

import { publicUrls } from '@/config/url';
import { createRecipeOfTheDay } from '@/lib/data/recipe';
import { prisma } from '@/prisma/prisma-client';

import type { LatestRecipe, RecipePreview } from '@/types/api';

async function getRecipeOfTheDay(): Promise<RecipePreview | null> {
  const data = await prisma.recipeOfTheDay.findFirst({
    orderBy: { createdAt: 'desc' },
    include: { recipe: { include: { user: true } } },
  });

  if (data) return data.recipe;

  const newData = await createRecipeOfTheDay();
  if (!newData) return null;
  revalidatePath(publicUrls.home);

  return newData.recipe;
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

export { getRecipeOfTheDay as getTodaysRecipe, getLatestRecipes, getMostPopularRecipes };
