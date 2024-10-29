'use server';

import { revalidatePath } from 'next/cache';

import { RecipeOfTheDayDetails } from '@/src/entities/recipe';
import { prisma } from '@/src/shared/api/prisma-client';
import { publicUrls } from '@/src/shared/config/url';

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

export { createRecipeOfTheDay };
