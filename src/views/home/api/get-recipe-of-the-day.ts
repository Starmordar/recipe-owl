import { redis } from '@/src/shared/api/redis/client';
import { recipeOfTheDayKey } from '@/src/shared/api/redis/keys';

import type { RecipeWithUser } from '@/src/entities/recipe';

async function getRecipeOfTheDay(): Promise<RecipeWithUser | null> {
  const recipes: Array<RecipeWithUser> | null = await redis.get(recipeOfTheDayKey);
  if (recipes === null) return null;

  return recipes[recipes.length - 1] ?? null;
}

export { getRecipeOfTheDay };
