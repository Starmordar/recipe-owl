'use server';

import { revalidatePath } from 'next/cache';

import { prisma } from '@/src/shared/api';
import { publicUrls } from '@/src/shared/config/url';

import type { RecipeOfTheDayDetails, RecipeWithUser } from '@/src/entities/recipe';

async function getRecipeOfTheDay(): Promise<RecipeWithUser | null> {
  const data = await prisma.recipeOfTheDay.findFirst({
    orderBy: { createdAt: 'desc' },
    include: { recipe: { include: { user: true } } },
  });

  if (data) return data.recipe;

  const newData = await chooseRecipeOfTheDay();
  if (!newData) return null;

  return newData.recipe;
}

async function chooseRecipeOfTheDay(): Promise<RecipeOfTheDayDetails | null> {
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

export { getRecipeOfTheDay, chooseRecipeOfTheDay };
