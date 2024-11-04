import { queryOptions } from '@tanstack/react-query';

import { searchIngredients } from './search-ingredients';

const ingredientQueries = {
  allKey: () => ['ingredients'],

  searchKey: () => [...ingredientQueries.allKey(), 'search'],
  search: (searchTerm: string) =>
    queryOptions({
      queryKey: [...ingredientQueries.searchKey(), searchTerm],
      queryFn: () => searchIngredients(searchTerm),
      placeholderData: prev => prev,
    }),

  filterSearchKey: () => [...ingredientQueries.allKey(), 'filter-search'],
  filterSearch: (searchTerm: string) =>
    queryOptions({
      queryKey: [...ingredientQueries.filterSearchKey(), searchTerm],
      queryFn: () => searchIngredients(searchTerm),
      placeholderData: prev => prev,
      select: data => {
        const exactMatch = data.some(
          ({ title }) => title.toLocaleLowerCase() === searchTerm.toLocaleLowerCase(),
        );
        return exactMatch ? data : [{ id: -1, title: searchTerm }, ...data];
      },
    }),
};

export { ingredientQueries };
