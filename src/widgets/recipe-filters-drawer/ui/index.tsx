'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

import {
  filterCategories,
  ingredientsCategory,
  quickFilterCategories,
} from '@/src/entities/recipe';
import { cn } from '@/src/shared/lib/classnames';
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
  const t = useTranslations();
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
            className={cn(
              'rounded-full gap-x-1.5',
              filterValues[tag]?.length > 0 &&
                'border-primary bg-primary/10 text-primary hover:bg-primary/15 hover:text-primary',
            )}
            variant='outline'
            size='xs'
            onClick={() => filterCategoryClick(tag)}
          >
            {t(`RecipeTags.Categories.${tag}`)}

            {filterValues[tag]?.length > 0 && (
              <span className='flex justify-center items-center min-w-4 h-4 px-1 text-primary-foreground bg-primary rounded-full text-xs'>
                {filterValues[tag]?.length}
              </span>
            )}
          </Button>
        ))}
      </div>

      <Drawer open={isDrawerOpen} onOpenChange={handleOpenDrawer}>
        <DrawerContent className='h-[85%]'>
          <DrawerHeader>
            <DrawerTitle>{t('RecipesPage.FiltersDrawer.title')}</DrawerTitle>
            <DrawerDescription className='sr-only'>
              {t('RecipesPage.FiltersDrawer.description')}
            </DrawerDescription>
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
