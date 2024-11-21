'use server';

import { prisma } from '@/src/shared/api';
import { elastic, type ElasticSearchResult } from '@/src/shared/api/elastic';

import { elasticRecipeViews } from '../config/elastic-index-name';

import type { ElasticRecipeView, RecipeBase } from '../model/types';

const sourceFields = ['recipeId'] as const;
type SearchResult = ElasticSearchResult<Pick<ElasticRecipeView, (typeof sourceFields)[number]>>;

async function getRecentlyViewed(userId: string): Promise<Array<RecipeBase>> {
  const searchResult = await elastic.search<SearchResult>({
    index: elasticRecipeViews,
    body: {
      query: { match: { userId: userId } },
      _source: sourceFields,
      sort: [{ _score: 'desc' }, { date: 'desc' }],
      size: 10,
    },
    pretty: true,
  });

  const hits = searchResult?.body?.hits?.hits ?? [];
  const recipeIds = hits.map(hit => hit._source.recipeId);
  return prisma.recipe.findMany({ where: { id: { in: recipeIds } } });
}

export { getRecentlyViewed };
