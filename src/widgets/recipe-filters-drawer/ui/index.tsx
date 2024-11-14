'use client';

import * as React from 'react';

import { filterCategories, ingredientsCategory, onlySavedCategory } from '@/src/entities/recipe';
import { useValueToPathname } from '@/src/shared/lib/use-value-to-pathname';
import { Button } from '@/src/shared/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/src/shared/ui/drawer';

import { Footer } from './drawer-footer';
import { IngredientsSection } from './ingredients-section';
import { OnlySavedSection } from './only-saved-section';
import { RecipeTags } from './recipe-tags';

import type { SelectedFilters } from '../model/types';

function RecipeFiltersDrawer() {
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

  const filterCount = valuesFromPathname(filterCategories);
  console.log('filterCount :>> ', filterCount);

  // const filtersCount = Object.values(valuesFromPathname(filterCategories)).reduce(
  //   (acc, filter) => acc + filter.length,
  //   0,
  // );

  const tags = [
    'Ingredients',
    'Mood',
    'Cuisine',
    'Nutrition',
    'Main Ingredient',
    'Complexity',
    'Time',
  ];

  return (
    <>
      <div className='flex w-full flex-nowrap overflow-auto justify-start gap-x-2 hide-scrollbar'>
        {tags.map(tag => (
          <Button
            key={tag}
            className='relative rounded-3xl py-0.5 gap-x-2'
            variant='outline'
            size='xss'
            onClick={() => setIsDrawerOpen(true)}
          >
            {tag}
            {filterCount[tag]?.length > 0 && (
              <span className='flex justify-center items-center w-4 h-4 text-accent bg-foreground rounded-full text-sm'>
                {filterCount[tag]?.length}
              </span>
            )}
          </Button>
        ))}
      </div>
      <Drawer open={isDrawerOpen} onOpenChange={handleOpenDrawer}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Recipes Filters</DrawerTitle>
          </DrawerHeader>

          <div className='flex flex-col h-[70vh] divide-y overflow-auto px-4'>
            <IngredientsSection
              category={ingredientsCategory}
              isSectionOpen={isDrawerOpen}
              selected={filters[ingredientsCategory] ?? []}
              onFilterChange={handleFiltersChange}
            />

            <OnlySavedSection
              category={onlySavedCategory}
              selected={filters[onlySavedCategory] ?? []}
              onFilterChange={handleFiltersChange}
            />

            <RecipeTags filters={filters} onFilterChange={handleFiltersChange} />
          </div>

          <DrawerFooter className='flex flex-row w-full'>
            <Footer filters={filters} setFilters={setFilters} categoryIds={filterCategories} />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export { RecipeFiltersDrawer };
