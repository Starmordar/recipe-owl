'use server';

import { prisma } from '@/src/shared/api';
import { elastic } from '@/src/shared/api/elastic';
import { AggregationResult } from '@/src/shared/api/elastic/types';

import { elasticRecipeViews } from '../config/elastic-index-name';

import type { RecipeBase } from '../model/types';

async function getWeekPopularRecipes(): Promise<Array<RecipeBase>> {
  const searchResult = await elastic.search<AggregationResult>({
    index: elasticRecipeViews,
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
          terms: { field: 'recipeId', size: 7 },
        },
      },
      size: 0,
    },
  });

  const buckets = searchResult.body?.aggregations?.recipes?.buckets;
  const recipeIds = buckets.map(bucket => parseInt(bucket.key));

  const recipes = await prisma.recipe.findMany({ where: { id: { in: recipeIds } } });
  return recipeIds.flatMap(recipeId => recipes.find(({ id }) => id === recipeId) ?? []);
}

export { getWeekPopularRecipes };
