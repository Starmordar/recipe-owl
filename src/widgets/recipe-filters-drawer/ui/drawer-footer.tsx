import { useRouter } from 'next/navigation';
import React from 'react';

import { useValueToPathname } from '@/src/shared/lib/use-value-to-pathname';
import { Button } from '@/src/shared/ui/button';
import { DrawerClose } from '@/src/shared/ui/drawer';

import type { SelectedFilters } from '../model/types';

interface FooterProps {
  filters: SelectedFilters;
  setFilters: (value: SelectedFilters) => void;
  categoryIds: Array<string>;
}

function Footer({ filters, setFilters, categoryIds }: FooterProps) {
  const { replace } = useRouter();
  const { valuesToPathname } = useValueToPathname();

  function handleFiltersApply(filters: SelectedFilters) {
    const pathname = valuesToPathname(filters, categoryIds);
    replace(pathname);
  }

  function handleResetFilters() {
    setFilters({});
    handleFiltersApply({});
  }

  return (
    <>
      <DrawerClose className='flex-1' asChild>
        <Button className='w-full' variant='outline' onClick={handleResetFilters}>
          Clear Filters
        </Button>
      </DrawerClose>

      <DrawerClose className='flex-1' asChild>
        <Button className='w-full' onClick={() => handleFiltersApply(filters)}>
          Apply
        </Button>
      </DrawerClose>
    </>
  );
}

export { Footer };
