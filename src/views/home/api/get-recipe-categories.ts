import { RecipeCategory } from '@/src/entities/recipe';
import { redis } from '@/src/shared/api/redis/client';
import { recipeCategoriesKey } from '@/src/shared/api/redis/keys';

async function getRecipeCategories(): Promise<Array<RecipeCategory>> {
  const categories: Array<RecipeCategory> | null = await redis.get(recipeCategoriesKey);

  return categories ?? [];
}

export { getRecipeCategories };
