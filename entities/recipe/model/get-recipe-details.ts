import { prisma } from '@/shared/api/prisma-client';

import { RecipeDetails } from './type';

async function getRecipeDetails(recipeId: number): Promise<RecipeDetails | null> {
  const recipe = await prisma.recipe.findFirst({
    where: { id: recipeId },
    include: { ingredients: { orderBy: { order: 'asc' } }, user: true },
  });

  return recipe;
}

export { getRecipeDetails };
