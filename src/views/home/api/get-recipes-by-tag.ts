'use server';

import { prisma } from '@/src/shared/api';

import type { RecipeBase } from '@/src/entities/recipe';

async function getRecipesByTag(tag: string): Promise<Array<RecipeBase>> {
  const recipes = await prisma.recipe.findMany({
    where: { tags: { has: tag } },
    orderBy: { createdAt: 'desc' },
    take: 10,
  });

  return recipes;
}

export { getRecipesByTag };
