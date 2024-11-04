import { queryOptions } from '@tanstack/react-query';

import { searchIngredients } from './search-ingredients';

const ingredientQueries = {
  allKey: () => ['ingredients'],

  searchKey: () => [...ingredientQueries.allKey(), 'search'],
  search: (searchTerm: string) =>
    queryOptions({
      queryKey: [...ingredientQueries.searchKey()],
      queryFn: () => searchIngredients(searchTerm),
      placeholderData: prev => prev,
    }),
};

export { ingredientQueries };
