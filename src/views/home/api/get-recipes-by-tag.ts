'use server';

import { prisma } from '@/src/shared/api';

import type { RecipePreview } from '@/src/entities/recipe';

async function getRecipesByTag(tag: string, limit = 15): Promise<Array<RecipePreview>> {
  const recipes = await prisma.recipe.findMany({
    where: { tags: { has: tag } },
    orderBy: { createdAt: 'desc' },
    select: { id: true, title: true, tags: true, imageUrl: true, cookTime: true },
    take: limit,
  });

  return recipes;
}

export { getRecipesByTag };
