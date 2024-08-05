import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { SlidersHorizontal, X } from 'lucide-react';
import FilterCard from './filter-card';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import UrlParamsService from '@/lib/service/url-params.service';

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

const categoryIds = categories.map((c) => c.id.toString());

type SelectedFilters = Record<number, Array<string>>;

export default function FiltersList() {
  const searchParams = useSearchParams();
  const [filters, setFilters] = React.useState<SelectedFilters>(getInitialFilters());

  const pathname = usePathname();
  const { replace } = useRouter();

  function getInitialFilters() {
    const params = new UrlParamsService(searchParams);
    return params.fromKeys(categoryIds);
  }

  function handleFiltersChange(categoryId: number, values: Array<string>) {
    setFilters({ ...filters, [categoryId]: values });
  }

  function handleFiltersApply(filters: SelectedFilters) {
    const params = new UrlParamsService(searchParams);

    params.clear(categoryIds);
    params.insert(filters);

    replace(`${pathname}?${params.toString()}`);
  }

  function handleResetFilters() {
    setFilters({});
    handleFiltersApply({});
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="min-h-10 min-w-10 rounded-full" variant="ghost" size="icon">
          <SlidersHorizontal className="h-4 w-4 opacity-50" />
        </Button>
      </DrawerTrigger>

      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Filters</DrawerTitle>
          </DrawerHeader>

          <div className="flex flex-col gap-4">
            {categories.map((category) => (
              <FilterCard
                selected={filters[category.id]}
                data={category}
                onChange={(values) => handleFiltersChange(category.id, values)}
              />
            ))}
          </div>

          <DrawerFooter className="flex flex-row w-full">
            <DrawerClose className="flex-1">
              <Button className="w-full" variant="outline" onClick={handleResetFilters}>
                Reset
              </Button>
            </DrawerClose>

            <DrawerClose className="flex-1">
              <Button className="w-full" onClick={() => handleFiltersApply(filters)}>
                Apply
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
