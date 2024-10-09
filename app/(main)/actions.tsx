import { revalidatePath } from 'next/cache';

import { publicUrls } from '@/config/url';
import { prisma } from '@/prisma/prisma-client';

import type { RecipeOfTheDay, LatestRecipe, RecipePreview } from '@/types/api';

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

async function createRecipeOfTheDay(): Promise<RecipeOfTheDay | null> {
  const lastRecipesOfTheDay = await prisma.recipeOfTheDay.findMany({
    select: { recipeId: true },
    orderBy: { createdAt: 'desc' },
    take: 3,
  });
  const lastRecipesOfTheDayIds = lastRecipesOfTheDay.map(({ recipeId }) => recipeId);

  const recipesCount = await prisma.recipe.count({
    where: { id: { notIn: lastRecipesOfTheDayIds } },
  });
  const skip = Math.floor(Math.random() * recipesCount);

  const nextRecipeOfTheDay = await prisma.recipe.findFirst({
    where: { id: { notIn: lastRecipesOfTheDayIds } },
    skip: skip,
  });
  if (!nextRecipeOfTheDay) return null;

  const recipe = await prisma.recipeOfTheDay.create({
    data: { recipeId: nextRecipeOfTheDay?.id },
    include: { recipe: { include: { user: true } } },
  });

  if (!recipe) return null;

  revalidatePath(publicUrls.home);
  return recipe;
}

export { getRecipeOfTheDay, getLatestRecipes, getMostPopularRecipes, createRecipeOfTheDay };
