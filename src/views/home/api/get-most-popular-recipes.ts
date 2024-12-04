import { redis } from '@/src/shared/api/redis/client';
import { mostPopularRecipesKey } from '@/src/shared/api/redis/keys';

import type { RecipeBase } from '@/src/entities/recipe';

async function getMostPopularRecipes(): Promise<Array<RecipeBase>> {
  const categories: Array<RecipeBase> | null = await redis.get(mostPopularRecipesKey);
  return categories ?? [];
}

export { getMostPopularRecipes };
