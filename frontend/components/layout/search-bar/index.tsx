'use client';

import { useQuery } from '@tanstack/react-query';
import { useDebounce } from '@uidotdev/usehooks';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import Search from '@/components/ui/search';
import { searchKey } from '@/constants/query';
import useValueToPathname from '@/hooks/useValueToPathname';
import { getRecipes } from '@/lib/data';

import CustomFilters from '../custom-filters';

export default function SearchBar() {
  const { replace } = useRouter();
  const { valueToPathname, valueFromPathname } = useValueToPathname();

  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(valueFromPathname(searchKey));
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
