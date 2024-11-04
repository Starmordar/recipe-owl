'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { publicUrls } from '@/src/shared/config/url';
import { useValueToPathname } from '@/src/shared/lib/use-value-to-pathname';

import { SearchInput } from './search-input';

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
      <SearchInput
        placeholder='Search for recipes'
        searchTerm={searchTerm}
        selectedValue={selectedValue}
        setSearchTerm={setSearchTerm}
        setSelected={handleSearch}
      />
    </>
  );
}

export { RecipeSearch };
