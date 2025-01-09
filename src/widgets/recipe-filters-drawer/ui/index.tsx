'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

import {
  filterCategories,
  ingredientsCategory,
  quickFilterCategories,
} from '@/src/entities/recipe';
import { useValueToPathname } from '@/src/shared/lib/use-value-to-pathname';
import { Button } from '@/src/shared/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/src/shared/ui/drawer';

import { Footer } from './drawer-footer';
import { RecipeIngredientsFilters } from './recipe-ingredients-filters';
import { RecipeTagsFilters } from './recipe-tags-filters';

import type { SelectedFilters } from '../model/types';

function RecipeFiltersDrawer() {
  const t = useTranslations('RecipeFilters');
  const { valuesFromPathname } = useValueToPathname();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [filters, setFilters] = useState<SelectedFilters>(valuesFromPathname(filterCategories));
  const [scrollIntoSection, setScrollIntoSection] = useState<string | null>(null);

  function handleFiltersChange(category: string, values: Array<string>) {
    setFilters({ ...filters, [category]: values });
  }

  function handleOpenDrawer(open: boolean) {
    setIsDrawerOpen(open);

    if (!open) return;
    setFilters(valuesFromPathname(filterCategories));
  }

  function filterCategoryClick(category: string) {
    setScrollIntoSection(category);
    setIsDrawerOpen(true);
  }

  const filterValues = valuesFromPathname(filterCategories);
  const sortedCategoriesByCount = [...quickFilterCategories].sort((a, b) =>
    (filterValues[a]?.length ?? 0) > (filterValues[b]?.length ?? 0) ? -1 : 1,
  );

  return (
    <>
      <div className='flex w-full flex-nowrap overflow-x-auto justify-start gap-x-2 hide-scrollbar'>
        {sortedCategoriesByCount.map(tag => (
          <Button
            key={tag}
            className='relative text-base rounded-3xl py-1 gap-x-2 font-semibold'
            variant='outline'
            size='xs'
            onClick={() => filterCategoryClick(tag)}
          >
            {t(`Tags.Categories.${tag}`)}

            {filterValues[tag]?.length > 0 && (
              <span className='flex justify-center items-center w-5 h-5 text-accent bg-foreground rounded-full text-sm font-medium'>
                {filterValues[tag]?.length}
              </span>
            )}
          </Button>
        ))}
      </div>

      <Drawer open={isDrawerOpen} onOpenChange={handleOpenDrawer}>
        <DrawerContent className='h-[85%]'>
          <DrawerHeader>
            <DrawerTitle>{t('Drawer.title')}</DrawerTitle>
            <DrawerDescription className='sr-only'>{t('Drawer.description')}</DrawerDescription>
          </DrawerHeader>

          <div className='overflow-y-auto p-4' data-vaul-no-drag>
            <div className='flex flex-col divide-y max-w-md mx-auto'>
              <RecipeIngredientsFilters
                isSectionOpen={isDrawerOpen}
                selected={filters[ingredientsCategory] ?? []}
                onFilterChange={handleFiltersChange}
              />

              {/* TODO: Implement only saved recipe filter */}
              {/* <RecipeSavedFilter
                selected={filters[onlySavedCategory] ?? []}
                onFilterChange={handleFiltersChange}
              /> */}

              <RecipeTagsFilters
                filters={filters}
                onFilterChange={handleFiltersChange}
                scrollIntoSection={scrollIntoSection}
                setScrollIntoSection={setScrollIntoSection}
              />
            </div>
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
