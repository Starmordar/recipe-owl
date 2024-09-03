import { prisma } from '@/prisma/prisma-client';

import type { GetCartResponse } from '@/types/api';

export async function getCart(): Promise<GetCartResponse> {
  const recipes = await prisma.recipe.findMany({ include: { ingredients: true } });

  return recipes.map(recipe => ({ recipe, ingredients: recipe.ingredients })) as GetCartResponse;
}
