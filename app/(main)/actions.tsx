import { revalidatePath } from 'next/cache';

import { prisma } from '@/shared/api/prisma-client';
import { publicUrls } from '@/shared/config/url';

import type { RecipeOfTheDayDetails, RecipeWithUser } from '@/entities/recipe';

async function getRecipeOfTheDay(): Promise<RecipeWithUser | null> {
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

async function getLatestRecipes(): Promise<Array<RecipeWithUser>> {
  const recipes = await prisma.recipe.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
    include: { user: true },
  });

  return recipes;
}

async function getMostPopularRecipes(): Promise<Array<RecipeWithUser>> {
  const recipes = await prisma.recipe.findMany({
    orderBy: { createdAt: 'asc' },
    take: 5,
    include: { user: true },
  });

  return recipes;
}

async function createRecipeOfTheDay(): Promise<RecipeOfTheDayDetails | null> {
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
