import { prisma } from '@/src/shared/api';

import type { Recipe } from '@prisma/client';

async function getCreatedRecipes(userId: string): Promise<Array<Recipe>> {
  const recipes = await prisma.recipe.findMany({
    where: { user: { id: userId } },
    orderBy: { updatedAt: 'desc' },
  });

  return recipes;
}

export { getCreatedRecipes };
