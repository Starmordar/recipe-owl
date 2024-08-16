import { SlidersHorizontal } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import useValueToPathname from '@/hooks/useValueToPathname';

import CategorySection from './components/category-section';
import Footer from './components/footer';

import type { SelectedFilters } from './types';

const categories = [
  {
    id: 1,
    name: 'Ingridients',
    options: [
      { id: 4, title: 'Onion' },
      { id: 5, title: 'Garlic' },
      { id: 6, title: 'Tomato' },
    ],
  },
  {
    id: 2,
    name: 'Difficulty',
    options: [
      { id: 1, title: 'Under 15 min' },
      { id: 2, title: 'Under 30 min' },
      { id: 3, title: 'Under 1 hour' },
    ],
  },
];

const categoryIds = categories.map(c => c.id.toString());

export default function CustomFilters() {
  const { valuesFromPathname } = useValueToPathname();
  const [filters, setFilters] = React.useState<SelectedFilters>(valuesFromPathname(categoryIds));

  function handleFiltersChange(categoryId: number, values: Array<string>) {
    setFilters({ ...filters, [categoryId]: values });
  }

  function handleOpenDrawer(open: boolean) {
    if (!open) return;
    setFilters(valuesFromPathname(categoryIds));
  }

  const filtersCount = Object.values(valuesFromPathname(categoryIds)).reduce(
    (acc, filter) => acc + filter.length,
    0,
  );

  return (
    <Drawer onOpenChange={handleOpenDrawer}>
      <DrawerTrigger asChild>
        <Button className='relative min-h-10 min-w-10 rounded-full' variant='ghost' size='icon'>
          <SlidersHorizontal className='h-4 w-4 opacity-50' />

          {filtersCount > 0 && (
            <div className='flex justify-center items-center absolute w-3.5 h-3.5 top-1.5 right-1.5 bg-primary text-[#fff] rounded-full text-xs'>
              {filtersCount}
            </div>
          )}
        </Button>
      </DrawerTrigger>

      <DrawerContent>
        <div className='mx-auto w-full max-w-sm'>
          <DrawerHeader>
            <DrawerTitle>Filters</DrawerTitle>
          </DrawerHeader>

          <div className='flex flex-col gap-4'>
            {categories.map(category => (
              <CategorySection
                key={category.id}
                selected={filters[category.id]}
                data={category}
                onChange={values => handleFiltersChange(category.id, values)}
              />
            ))}
          </div>

          <DrawerFooter className='flex flex-row w-full'>
            <Footer filters={filters} setFilters={setFilters} categoryIds={categoryIds} />
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
