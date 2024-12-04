import { revalidatePath } from 'next/cache';

import { prisma } from '@/src/shared/api';
import { redis } from '@/src/shared/api/redis/client';
import { recipeCategoriesKey, recipeOfTheDayKey } from '@/src/shared/api/redis/keys';
import { publicUrls } from '@/src/shared/config/url';

import { recipeCategoryGroups } from '../config/recipe-category-groups';

import type { RecipeCategory, RecipePreview, RecipeWithUser } from '@/src/entities/recipe';

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

async function chooseRecipeOfTheDay(): Promise<RecipeWithUser | null> {
  const lastRecipesOfTheDay: Array<RecipeWithUser> = (await redis.get(recipeOfTheDayKey)) ?? [];
  const lastRecipesOfTheDayIds = lastRecipesOfTheDay.map(({ id }) => id) ?? [];

  const recipesCount = await prisma.recipe.count({
    where: { id: { notIn: lastRecipesOfTheDayIds } },
  });
  const skip = Math.floor(Math.random() * recipesCount);

  const nextRecipeOfTheDay = await prisma.recipe.findFirst({
    where: { id: { notIn: lastRecipesOfTheDayIds } },
    include: { user: true },
    skip: skip,
  });
  if (!nextRecipeOfTheDay) return null;

  lastRecipesOfTheDay.push(nextRecipeOfTheDay);
  if (lastRecipesOfTheDay.length > 3) lastRecipesOfTheDay.shift();

  await redis.set(recipeOfTheDayKey, JSON.stringify(lastRecipesOfTheDay));
  return nextRecipeOfTheDay;
}

async function dailyRefresh() {
  await Promise.allSettled([chooseDailyRecipeCategories(), chooseRecipeOfTheDay()]);
  revalidatePath(publicUrls.home, 'page');
}

export { dailyRefresh };
