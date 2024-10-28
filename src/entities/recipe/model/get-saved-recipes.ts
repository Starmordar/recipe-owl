import { prisma } from '@/src/shared/api/prisma-client';

import type { RecipeWithUser } from './type';

async function getSavedRecipes(userId: string): Promise<Array<RecipeWithUser>> {
  const response = await prisma.savedRecipe.findMany({
    where: { userId },
    include: { recipe: true, user: true },
  });

  if (response === null) return [];
  return response.map(({ recipe, user }) => ({ ...recipe, user }));
}

export { getSavedRecipes };
