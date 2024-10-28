'use server';

import { revalidatePath } from 'next/cache';

import { prisma } from '@/shared/api/prisma-client';
import { publicUrls } from '@/shared/config/url';

async function saveRecipe(userId: string, recipeId: number): Promise<void> {
  await prisma.savedRecipe.create({ data: { userId, recipeId } });
  revalidatePath(publicUrls.recipe(recipeId));
}

export { saveRecipe };
