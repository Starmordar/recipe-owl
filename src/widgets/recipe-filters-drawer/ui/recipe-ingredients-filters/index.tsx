'use client';

import { useQuery } from '@tanstack/react-query';
import { useDebounce } from '@uidotdev/usehooks';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import { ingredientQueries } from '@/src/entities/ingredient';
import { ingredientsCategory } from '@/src/entities/recipe';
import Search from '@/src/shared/ui/search';

import { SelectedIngredients } from './selected-ingredients';

interface RecipeIngredientsFiltersProps {
  isSectionOpen: boolean;
  selected: Array<string>;
  onFilterChange: (category: string, values: Array<string>) => void;
}

function RecipeIngredientsFilters({
  isSectionOpen,
  selected,
  onFilterChange,
}: RecipeIngredientsFiltersProps) {
  const t = useTranslations('RecipesPage.FiltersDrawer');
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
    if (!nextValue) return;

    const alreadySelected = selected.some(s => s === nextValue);
    if (alreadySelected) return;

    onFilterChange(ingredientsCategory, [...selected, nextValue]);
  }

  return (
    <div className='flex flex-col pb-4 space-y-3'>
      <h6 className='text-lg font-semibold leading-tight'>{t('ingredientsLabel')}</h6>

      <Search
        placeholder={t('searchIngredientsPlaceholder')}
        data={ingredients ?? []}
        searchTerm={searchTerm}
        setSearchTerm={nextValue => handleSearch(nextValue)}
        setSelected={nextValue => handleValueSelect(nextValue)}
        open={open}
        setOpen={setOpen}
      />

      {selected.length > 0 && (
        <SelectedIngredients
          selected={selected}
          options={selected}
          onChange={values => onFilterChange(ingredientsCategory, values)}
        />
      )}
    </div>
  );
}

export { RecipeIngredientsFilters };
