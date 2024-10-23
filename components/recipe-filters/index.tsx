'use client';

import { SlidersHorizontal } from 'lucide-react';
import * as React from 'react';

import useValueToPathname from '@/shared/hooks/useValueToPathname';
import HeaderIconButton from '@/shared/ui/app-header-icon-button';
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/shared/ui/drawer';

import Footer from './components/footer';
import IngredientsSection from './components/ingredients-section';
import OnlySavedSection from './components/only-saved-section';
import {
  ingredientsCategory,
  onlySavedCategory,
  filterCategories,
} from './constants/filter-categories';

import type { SelectedFilters } from './types';

function RecipeFilters() {
  const { valuesFromPathname } = useValueToPathname();
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [filters, setFilters] = React.useState<SelectedFilters>(
    valuesFromPathname(filterCategories),
  );

  function handleFiltersChange(category: string, values: Array<string>) {
    setFilters({ ...filters, [category]: values });
  }

  function handleOpenDrawer(open: boolean) {
    setIsDrawerOpen(open);

    if (!open) return;
    setFilters(valuesFromPathname(filterCategories));
  }

  const filtersCount = Object.values(valuesFromPathname(filterCategories)).reduce(
    (acc, filter) => acc + filter.length,
    0,
  );

  return (
    <Drawer open={isDrawerOpen} onOpenChange={handleOpenDrawer}>
      <DrawerTrigger asChild>
        <HeaderIconButton Icon={<SlidersHorizontal />} aria-label='Search Filters'>
          {filtersCount > 0 && (
            <span className='flex justify-center items-center absolute w-3.5 h-3.5 text-accent top-0 right-0 bg-primary rounded-full text-xs'>
              {filtersCount}
            </span>
          )}
        </HeaderIconButton>
      </DrawerTrigger>

      <DrawerContent>
        <div className='mx-auto w-full max-w-sm'>
          <DrawerHeader>
            <DrawerTitle>Filters</DrawerTitle>
          </DrawerHeader>

          <div className='flex flex-col h-[40vh]'>
            <IngredientsSection
              category={ingredientsCategory}
              isSectionOpen={isDrawerOpen}
              selected={filters[ingredientsCategory] ?? []}
              onFilterChange={handleFiltersChange}
            />

            <hr className='h-0.5 border-t-0 bg-muted' />

            <OnlySavedSection
              category={onlySavedCategory}
              selected={filters[onlySavedCategory] ?? []}
              onFilterChange={handleFiltersChange}
            />
          </div>

          <DrawerFooter className='flex flex-row w-full'>
            <Footer filters={filters} setFilters={setFilters} categoryIds={filterCategories} />
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default RecipeFilters;
