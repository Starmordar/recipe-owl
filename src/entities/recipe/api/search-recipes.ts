'use server';

import { elastic, type ElasticSearchResult } from '@/src/shared/api/elastic';

import { elasticIndexName } from '../config/elastic-index-name';
import { ingredientsCategory } from '../config/search-recipes';

import type { ElasticRecipe, RecipeSearchResult } from '../model/types';

type Filters = Record<string, string | Array<string> | undefined>;

const sourceFields = ['title', 'imageUrl'] as const;
type SearchResult = ElasticSearchResult<Pick<ElasticRecipe, (typeof sourceFields)[number]>>;

async function searchRecipes(
  searchTerm: string,
  filters: Filters,
): Promise<Array<RecipeSearchResult>> {
  const searchResult = await elastic.search<SearchResult>({
    index: elasticIndexName,
    body: {
      query: getSearchFilter(searchTerm, filters),
      _source: sourceFields,
    },
    pretty: true,
  });

  const hits = searchResult?.body?.hits?.hits ?? [];

  const recipes = hits.map(hit => ({ id: hit._id, ...hit._source }));
  return recipes;
}

function getSearchFilter(searchTerm: string, filters: Filters) {
  const searchTermFilter = getSearchTermFilter(searchTerm);
  const ingredientsFilter = getIngredientsFilter(filters);
  const matchAllsFilter = getMatchAllFilter(searchTerm, filters);

  return {
    bool: {
      must: [...searchTermFilter, ...ingredientsFilter],
      ...matchAllsFilter,
    },
  };
}

function getMatchAllFilter(searchTerm: string, filters: Filters) {
  if (searchTerm || Object.keys(filters).length > 0) return {};
  return { must: [{ match_all: {} }] };
}

function getSearchTermFilter(searchTerm: string) {
  if (!searchTerm) return [];

  return [
    {
      multi_match: {
        query: searchTerm,
        fields: ['title^2', 'description', 'ingredients'],
        fuzziness: 'AUTO',
      },
    },
  ];
}

function getIngredientsFilter(filters: Filters) {
  const ingredients = getIngredientsFromFilters(filters);

  if (ingredients.length === 0) return [];

  return [
    {
      bool: {
        should: ingredients.map(ingredient => ({
          match: { ingredients: ingredient },
        })),
      },
    },
  ];
}

function getIngredientsFromFilters(filters: Filters): Array<string> {
  if (filters[ingredientsCategory]) {
    const ingredients = filters[ingredientsCategory];
    return typeof ingredients === 'string' ? [ingredients] : ingredients;
  }

  return [];
}

export { searchRecipes };
