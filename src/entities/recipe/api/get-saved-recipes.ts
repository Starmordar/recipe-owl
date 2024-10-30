import { prisma } from '@/src/shared/api';

import type { RecipeWithUser } from '../model/types';

async function getSavedRecipes(userId: string): Promise<Array<RecipeWithUser>> {
  const response = await prisma.savedRecipe.findMany({
    where: { userId },
    include: { recipe: true, user: true },
  });

  if (response === null) return [];
  return response.map(({ recipe, user }) => ({ ...recipe, user }));
}

export { getSavedRecipes };
