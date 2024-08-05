import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { SlidersHorizontal, X } from 'lucide-react';
import FilterCard from './filter-card';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';

interface Categoty {
  id: number;
  name: string;
  options: Array<{ id: number; title: string }>;
}

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

type SelectedFilters = Record<number, Array<string>>;

export default function FiltersList() {
  const [filters, setFilters] = React.useState<SelectedFilters>({});

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleFiltersChange(categoryId: number, newFilters: Array<string>) {
    setFilters({ ...filters, [categoryId]: newFilters });
  }

  function handleFiltersApply() {
    const params = new URLSearchParams(searchParams);

    for (const [categoryId, values] of Object.entries(filters)) {
      values.forEach((value) => params.append(categoryId.toString(), value));
    }

    replace(`${pathname}?${params.toString()}`);
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
            <Button className="flex-1" variant="outline">
              Reset
            </Button>
            <Button className="flex-1" onClick={handleFiltersApply}>
              Apply
            </Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
