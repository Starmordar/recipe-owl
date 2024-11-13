import { queryOptions } from '@tanstack/react-query';

import { searchSuggestions } from './search-suggestions';
import { searchTags } from './search-tags';

const recipeQueries = {
  allKey: () => ['ingredients'],

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
};

export { recipeQueries };
