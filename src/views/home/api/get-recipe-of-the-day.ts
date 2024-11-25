'use server';

import { revalidatePath } from 'next/cache';

import { prisma } from '@/src/shared/api';
import { publicUrls } from '@/src/shared/config/url';

import { createRecipeOfTheDay } from './create-recipe-of-the-day';

import type { RecipeWithUser } from '@/src/entities/recipe';

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

export { getRecipeOfTheDay };
