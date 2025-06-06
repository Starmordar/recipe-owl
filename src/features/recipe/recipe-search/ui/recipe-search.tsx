'use client';

import { useQuery } from '@tanstack/react-query';
import { useDebounce } from '@uidotdev/usehooks';
import { useState } from 'react';

import { filterCategories, recipeQueries, searchFilter } from '@/src/entities/recipe';
import { useRouter } from '@/src/shared/i18n/routing';
import { useValueToPathname } from '@/src/shared/lib/use-value-to-pathname';

import { storeRecipeRecentSearches } from '../model/recent-searches';

import { SearchInput } from './search-input';

function RecipeSearch() {
  const { replace } = useRouter();
  const { valueToPathname, valueFromPathname, valuesFromPathname } = useValueToPathname();

  const [searchTerm, setSearchTerm] = useState(valueFromPathname(searchFilter));
  const [selectedValue, setSelectedValue] = useState(valueFromPathname(searchFilter));

  const debouncedSearchTerm = useDebounce(searchTerm, 100);
  const { data: suggestions } = useQuery(recipeQueries.searchSuggestions(debouncedSearchTerm));

  function handleSearch(value: string) {
    setSelectedValue(value);
    storeRecipeRecentSearches(value);

    const pathname = valueToPathname(searchFilter, value);
    replace(pathname);
  }

  const filterValues = valuesFromPathname(filterCategories);

  return (
    <SearchInput
      searchTerm={searchTerm}
      selectedValue={selectedValue}
      setSearchTerm={setSearchTerm}
      setSelected={handleSearch}
      suggestions={suggestions ?? []}
      hasSelectedFilters={Object.keys(filterValues).length > 0}
    />
  );
}

export { RecipeSearch };
