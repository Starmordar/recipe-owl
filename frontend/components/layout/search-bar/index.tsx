'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from '@uidotdev/usehooks';
import { useRouter } from 'next/navigation';

import useValueToPathname from '@/hooks/useValueToPathname';

import Search from '@/components/ui/search';
import CustomFilters from '../custom-filters';

import { getRecipes } from '@/lib/data';
import { searchKey } from '@/constants/query';

export default function SearchBar() {
  const { replace } = useRouter();
  const { valueToPathname, valueFromPathname } = useValueToPathname();

  const [open, setOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState(valueFromPathname(searchKey));
  const debouncedSearchTerm = useDebounce(searchTerm, 250);

  const { data: recipes } = useQuery({
    queryKey: ['recipes', debouncedSearchTerm],
    queryFn: () => getRecipes(debouncedSearchTerm),
    select: (data) => data.recipes,
  });

  function handleSearch(value: string) {
    const pathname = valueToPathname(searchKey, value);
    replace(pathname);
  }

  return (
    <div className="container flex items-center pt-2 pb-1">
      <Search
        placeholder="Search for recipes"
        data={recipes ?? []}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setSelected={handleSearch}
        open={open}
        setOpen={setOpen}
      />

      <CustomFilters />
    </div>
  );
}
