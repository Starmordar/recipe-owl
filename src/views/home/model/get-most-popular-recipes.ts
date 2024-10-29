'use server';

import { prisma } from '@/src/shared/api/prisma-client';

import type { RecipeWithUser } from '@/src/entities/recipe';

async function getMostPopularRecipes(): Promise<Array<RecipeWithUser>> {
  const recipes = await prisma.recipe.findMany({
    orderBy: { createdAt: 'asc' },
    take: 5,
    include: { user: true },
  });

  return recipes;
}

export { getMostPopularRecipes };
