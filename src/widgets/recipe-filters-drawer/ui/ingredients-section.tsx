'use client';

import { useQuery } from '@tanstack/react-query';
import { useDebounce } from '@uidotdev/usehooks';
import { useEffect, useState } from 'react';

import { ingredientQueries } from '@/src/entities/ingredient';
import Search from '@/src/shared/ui/search';

import { CategorySection } from './category-section';

interface IngredientsSectionProps {
  category: string;
  isSectionOpen: boolean;
  selected: Array<string>;
  onFilterChange: (category: string, values: Array<string>) => void;
}

function IngredientsSection({
  category,
  isSectionOpen,
  selected,
  onFilterChange,
}: IngredientsSectionProps) {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const debouncedSearchTerm = useDebounce(searchTerm, 100);
  const { data: ingredients } = useQuery(ingredientQueries.filterSearch(debouncedSearchTerm));

  useEffect(() => handleSearchReset(), [isSectionOpen]);

  function handleSearch(nextValue: string) {
    setSearchTerm(nextValue);
  }

  function handleSearchReset() {
    setSearchTerm('');
    setOpen(false);
  }

  function handleValueSelect(nextValue: string) {
    handleSearchReset();

    const alreadySelected = selected.some(s => s === nextValue);
    if (alreadySelected) return;

    onFilterChange(category, [...selected, nextValue]);
  }

  return (
    <div className='flex flex-col pb-3 space-y-2'>
      <h6 className='text-base font-semibold leading-tight'>Search By Ingredients</h6>

      <Search
        placeholder='Add Item'
        data={ingredients ?? []}
        searchTerm={searchTerm}
        setSearchTerm={nextValue => handleSearch(nextValue)}
        setSelected={nextValue => handleValueSelect(nextValue)}
        open={open}
        setOpen={setOpen}
      />

      {selected.length > 0 && (
        <CategorySection
          selected={selected}
          options={selected}
          onChange={values => onFilterChange(category, values)}
        />
      )}
    </div>
  );
}

export { IngredientsSection };
