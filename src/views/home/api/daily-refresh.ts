import { prisma } from '@/src/shared/api';
import { redis } from '@/src/shared/api/redis/client';
import { recipeCategoriesKey } from '@/src/shared/api/redis/keys';

import { recipeCategoryGroups } from '../config/recipe-category-groups';

import { chooseRecipeOfTheDay } from './get-recipe-of-the-day';

import type { RecipeCategory, RecipePreview } from '@/src/entities/recipe';

const randomIndex = (length: number) => Math.floor(Math.random() * length);

async function getRecipesByTag(tag: string, limit = 15): Promise<Array<RecipePreview>> {
  const recipes = await prisma.recipe.findMany({
    where: { tags: { has: tag } },
    orderBy: { createdAt: 'desc' },
    select: { id: true, title: true, tags: true, imageUrl: true, cookTime: true },
    take: limit,
  });

  return recipes;
}

async function chooseDailyRecipeCategories() {
  const recipeCategories: Array<RecipeCategory> = [];

  for (const { categories } of recipeCategoryGroups) {
    const category = categories[randomIndex(categories.length)];
    const recipesByCategory = await getRecipesByTag(category.tag);
    recipeCategories.push({ title: category.title, tag: category.tag, recipes: recipesByCategory });
  }

  const data = JSON.stringify(recipeCategories);
  await redis.set(recipeCategoriesKey, data);
}

async function dailyRefresh() {
  await Promise.allSettled([chooseDailyRecipeCategories(), chooseRecipeOfTheDay()]);
}

export { dailyRefresh };
