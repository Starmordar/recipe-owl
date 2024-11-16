'use client';

import { useQuery } from '@tanstack/react-query';
import { useDebounce } from '@uidotdev/usehooks';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { filterCategories, recipeQueries } from '@/src/entities/recipe';
import { useValueToPathname } from '@/src/shared/lib/use-value-to-pathname';

import { storeRecipeRecentSearches } from '../model/recent-searches';

import { SearchInput } from './search-input';

function RecipeSearch() {
  const { replace } = useRouter();
  const { valueToPathname, valueFromPathname, valuesFromPathname } = useValueToPathname();

  const [searchTerm, setSearchTerm] = useState(valueFromPathname('search'));
  const [selectedValue, setSelectedValue] = useState(valueFromPathname('search'));

  const filterValues = valuesFromPathname(filterCategories);

  const debouncedSearchTerm = useDebounce(searchTerm, 100);
  const { data: suggestions } = useQuery(recipeQueries.searchSuggestions(debouncedSearchTerm));

  function handleSearch(value: string) {
    setSelectedValue(value);
    storeRecipeRecentSearches(value);

    const pathname = valueToPathname('search', value);
    replace(pathname);
  }

  return (
    <SearchInput
      placeholder='Search for recipes'
      searchTerm={searchTerm}
      selectedValue={selectedValue}
      setSearchTerm={setSearchTerm}
      setSelected={handleSearch}
      suggestions={suggestions ?? []}
      filterCount={Object.keys(filterValues).length}
    />
  );
}

export { RecipeSearch };
