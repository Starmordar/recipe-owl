'use server';

import { revalidatePath } from 'next/cache';

import { prisma } from '@/shared/api/prisma-client';
import { publicUrls } from '@/shared/config/url';

async function unsaveRecipe(userId: string, recipeId: number): Promise<void> {
  await prisma.savedRecipe.deleteMany({ where: { userId, recipeId } });
  revalidatePath(publicUrls.recipe(recipeId));
}

export { unsaveRecipe };
