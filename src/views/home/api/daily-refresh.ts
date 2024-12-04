import { revalidatePath } from 'next/cache';

import {
  elasticRecipeViewsIndex,
  type RecipeBase,
  type RecipeCategory,
  type RecipePreview,
  type RecipeWithUser,
} from '@/src/entities/recipe';
import { prisma } from '@/src/shared/api';
import { elastic } from '@/src/shared/api/elastic';
import { redis } from '@/src/shared/api/redis/client';
import {
  mostPopularRecipesKey,
  recipeCategoriesKey,
  recipeOfTheDayKey,
} from '@/src/shared/api/redis/keys';
import { publicUrls } from '@/src/shared/config/url';

import { recipeCategoryGroups } from '../config/recipe-category-groups';

import type { AggregationResult } from '@/src/shared/api/elastic/types';

const randomIndex = (length: number) => Math.floor(Math.random() * length);

// ================== Daily Recipe Categories ===================
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

// ===================== Recipe of the Day ===================
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

// ===================== Popular Recipes ===================
async function updateWeekPopularRecipes() {
  const searchResult = await elastic.search<AggregationResult>({
    index: elasticRecipeViewsIndex,
    body: {
      query: {
        range: {
          date: {
            gte: 'now-7d/d',
            lte: 'now/d',
          },
        },
      },
      aggs: {
        recipes: {
          terms: { field: 'recipeId', size: 10 },
        },
      },
      size: 0,
    },
  });

  const buckets = searchResult.body?.aggregations?.recipes?.buckets;
  const recipeIds = buckets.map(bucket => parseInt(bucket.key));

  const recipes = await prisma.recipe.findMany({ where: { id: { in: recipeIds } } });
  const data = recipeIds.flatMap(recipeId => recipes.find(({ id }) => id === recipeId) ?? []);

  await redis.set(mostPopularRecipesKey, JSON.stringify(data));
}

async function dailyRefresh() {
  await Promise.allSettled([
    chooseDailyRecipeCategories(),
    chooseRecipeOfTheDay(),
    updateWeekPopularRecipes(),
  ]);

  revalidatePath(publicUrls.home, 'page');
}

export { dailyRefresh };
