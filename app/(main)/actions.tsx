import { prisma } from '@/prisma/prisma-client';
import { RecipeDetails } from '@/types/api';

async function getTodaysRecipe(): Promise<RecipeDetails | null> {
  const recipe = await prisma.recipe.findFirst({
    where: { id: 2 },
    include: { ingredients: { orderBy: { order: 'asc' } }, user: true },
  });

  return recipe;
}

export { getTodaysRecipe };
