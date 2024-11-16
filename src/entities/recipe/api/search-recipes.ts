'use server';

import { elastic, type ElasticSearchResult } from '@/src/shared/api/elastic';

import { elasticIndexName } from '../config/elastic-index-name';
import { ingredientsCategory, tagsCategories } from '../config/search-recipes';

import type { ElasticRecipe, RecipeSearchResult } from '../model/types';

type Filters = Record<string, string | Array<string> | undefined>;

const sourceFields = ['title', 'imageUrl', 'cookTime', 'tags'] as const;
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
      sort: [{ _score: 'desc' }, { createdAt: 'asc' }],
    },
    pretty: true,
  });

  const hits = searchResult?.body?.hits?.hits ?? [];

  const recipes = hits.map(hit => ({ id: parseInt(hit._id, 10), ...hit._source }));
  return recipes;
}

function getSearchFilter(searchTerm: string, filters: Filters) {
  const searchTermFilter = getSearchTermFilter(searchTerm);
  const ingredientsFilter = getIngredientsFilter(filters);
  const tagsFilter = getTagsFilter(filters);
  const matchAllsFilter = getMatchAllFilter(searchTerm, filters);

  return {
    bool: {
      must: [...searchTermFilter, ...ingredientsFilter, ...tagsFilter],
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

function getTagsFilter(filters: Filters) {
  const tags = getTagsFromFilter(filters);
  if (tags.length === 0) return [];

  return [
    {
      bool: {
        should: tags.map(tag => ({
          match: { tags: tag },
        })),
      },
    },
  ];
}

function getTagsFromFilter(filters: Filters): Array<string> {
  const tags = [];

  for (const categoryName of tagsCategories) {
    if (!filters[categoryName]) continue;

    if (typeof filters[categoryName] === 'string') tags.push(filters[categoryName]);
    else tags.push(...filters[categoryName]);
  }

  return tags;
}

export { searchRecipes };
