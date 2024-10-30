'use server';

import { prisma } from '@/src/shared/api';

import type { RecipeWithUser } from '@/src/entities/recipe';

async function getLatestRecipes(): Promise<Array<RecipeWithUser>> {
  const recipes = await prisma.recipe.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
    include: { user: true },
  });

  return recipes;
}

export { getLatestRecipes };
