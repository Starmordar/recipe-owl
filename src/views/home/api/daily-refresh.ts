import { RecipeCategory } from '@/src/entities/recipe';
import { redis } from '@/src/shared/api/redis/client';
import { recipeCategoriesKey } from '@/src/shared/api/redis/keys';

import { recipeCategoryGroups } from '../config/recipe-category-groups';

import { createRecipeOfTheDay } from './create-recipe-of-the-day';
import { getRecipesByTag } from './get-recipes-by-tag';

const randomIndex = (length: number) => Math.floor(Math.random() * length);

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
  await Promise.allSettled([chooseDailyRecipeCategories(), createRecipeOfTheDay()]);
}

export { dailyRefresh };
