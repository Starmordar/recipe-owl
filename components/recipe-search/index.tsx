'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import { publicUrls } from '@/shared/config/url';
import useValueToPathname from '@/shared/hooks/useValueToPathname';

import Search from './components/search';

function RecipeSearch() {
  const { replace } = useRouter();
  const { valueToPathname, valueFromPathname } = useValueToPathname();

  const [searchTerm, setSearchTerm] = useState(valueFromPathname('search'));
  const [selectedValue, setSelectedValue] = useState(valueFromPathname('search'));

  function handleSearch(value: string) {
    setSelectedValue(value);

    const pathname = valueToPathname('search', value);
    replace(pathname);
  }

  function resetSearch() {
    setSearchTerm('');
    setSelectedValue('');
  }

  return (
    <>
      {selectedValue !== '' && (
        <Link href={publicUrls.recipes} aria-label='Clear Search' onClick={resetSearch} replace>
          <ArrowLeft className='h-5 w-5' />
        </Link>
      )}
      <Search
        placeholder='Search for recipes'
        searchTerm={searchTerm}
        selectedValue={selectedValue}
        setSearchTerm={setSearchTerm}
        setSelected={handleSearch}
      />
    </>
  );
}

export default RecipeSearch;
