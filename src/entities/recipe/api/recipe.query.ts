import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';

import { searchRecipes } from './search-recipes';
import { searchSuggestions } from './search-suggestions';
import { searchTags } from './search-tags';

const recipeQueries = {
  allKey: () => ['recipes'],

  searchTagsKey: () => [...recipeQueries.allKey(), 'search-tags'],
  searchTags: (searchTerm: string) =>
    queryOptions({
      queryKey: [...recipeQueries.searchTagsKey(), searchTerm],
      queryFn: () => searchTags(searchTerm),
      placeholderData: prev => prev,
    }),

  searchSuggestionsKey: () => [...recipeQueries.searchTagsKey(), 'search-suggestions'],
  searchSuggestions: (searchTerm: string) =>
    queryOptions({
      queryKey: [...recipeQueries.searchSuggestionsKey(), searchTerm],
      queryFn: () => searchSuggestions(searchTerm),
      enabled: !!searchTerm,
      placeholderData: prev => prev,
    }),

  searchRecipesKey: () => [...recipeQueries.searchSuggestionsKey(), 'search-recipes'],
  searchRecipes: (
    searchTerm: string,
    filters: Record<string, string | Array<string> | undefined>,
    initialPageParam: number,
  ) =>
    infiniteQueryOptions({
      queryKey: [...recipeQueries.searchRecipesKey(), searchTerm, filters],
      queryFn: ({ pageParam }) => searchRecipes(searchTerm, filters, pageParam),
      initialPageParam,
      getNextPageParam: (lastPage, _, lastPageParam) =>
        lastPage.length === 0 ? undefined : lastPageParam + 1,
    }),
};

export { recipeQueries };
