'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from '@uidotdev/usehooks';

import Search from '@/components/ui/search';
import SearchExit from './search-exit';
import FiltersList from './filters-list';

import { getRecipes } from '@/lib/data';

export default function SearchBar() {
  const [selected, setSelected] = React.useState('');
  const [searchTerm, setSearchTerm] = React.useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 250);

  const { data: recipes } = useQuery({
    queryKey: ['recipes', debouncedSearchTerm],
    queryFn: () => getRecipes(debouncedSearchTerm),
    select: (data) => data.recipes,
  });

  return (
    <div className="flex items-center">
      <SearchExit hidden={false} onExit={() => {}} />

      <Search
        placeholder="Search for recipes"
        data={recipes ?? []}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selected={selected}
        setSelected={setSelected}
      />

      <FiltersList />
    </div>
  );
}
