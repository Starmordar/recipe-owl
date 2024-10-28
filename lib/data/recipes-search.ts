import { ingredientsCategory } from '@/components/recipe-filters/constants/filter-categories';

import { elastic } from '../../shared/api/elastic-client';

import type { RecipeSearchResult } from '@/types/api';

type Filters = Record<string, string | Array<string> | undefined>;
interface SearchResult {
  hits: { hits: Array<{ _id: string; _source: { title: string; imageUrl: string } }> };
}

export async function searchRecipes(
  searchTerm: string,
  filters: Filters,
): Promise<Array<RecipeSearchResult>> {
  const searchResult = await elastic.search<SearchResult>({
    index: 'recipes',
    body: {
      query: getSearchFilter(searchTerm, filters),
      _source: ['title', 'imageUrl'],
    },
    pretty: true,
  });

  const hits = searchResult.body.hits.hits;

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
