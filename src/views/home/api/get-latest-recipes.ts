'use server';

import { prisma } from '@/src/shared/api';

import type { RecipeBase } from '@/src/entities/recipe';

async function getLatestRecipes(): Promise<Array<RecipeBase>> {
  const recipes = await prisma.recipe.findMany({
    orderBy: { createdAt: 'desc' },
    take: 10,
  });

  return recipes;
}

export { getLatestRecipes };
