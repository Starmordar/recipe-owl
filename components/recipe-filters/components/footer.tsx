import { useRouter } from 'next/navigation';
import React from 'react';

import useValueToPathname from '@/shared/hooks/useValueToPathname';
import { Button } from '@/shared/ui/button';
import { DrawerClose } from '@/shared/ui/drawer';

import type { SelectedFilters } from '../types';

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
          Reset
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

export default Footer;
