import { queryOptions } from '@tanstack/react-query';

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
};

export { recipeQueries };
