'use client';

import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useEffect, useRef } from 'react';

import { recipeQueries } from '@/src/entities/recipe';
import { ToggleGroup, ToggleGroupItem } from '@/src/shared/ui/toggle-group';

import { RecipeTagsFiltersSkeleton } from './skeleton';

import type { SelectedFilters } from '../../model/types';

interface RecipeTagsFiltersProps {
  filters: SelectedFilters;
  onFilterChange: (category: string, value: Array<string>) => void;

  scrollIntoSection: string | null;
  setScrollIntoSection: (category: string | null) => void;
}

function RecipeTagsFilters({
  filters,
  onFilterChange,
  scrollIntoSection,
  setScrollIntoSection,
}: RecipeTagsFiltersProps) {
  const t = useTranslations();

  const { data: tags, isLoading } = useQuery(recipeQueries.searchTags('', t));
  const scrolled = useRef(false);

  useEffect(() => {
    if (isLoading || !scrollIntoSection || scrolled.current) return;

    const target = document.querySelector(`#${scrollIntoSection}-recipe-filter-section`);
    target?.scrollIntoView({ behavior: 'smooth' });

    setScrollIntoSection(null);
    scrolled.current = true;
  }, [scrollIntoSection, isLoading, setScrollIntoSection]);

  if (isLoading) return <RecipeTagsFiltersSkeleton />;

  return (
    <>
      {tags?.map(tag => (
        <ToggleGroup
          key={tag.type.value}
          id={`${tag.type}-recipe-filter-section`}
          value={filters[tag.type.value]}
          onValueChange={value => onFilterChange(tag.type.value, value)}
          type='multiple'
          variant='outline'
          className='flex flex-col items-start gap-2 py-4 last:pb-0'
        >
          <p className='font-semibold text-lg'>{tag.type.title}</p>

          <div className='flex flex-wrap justify-start gap-2'>
            {tag.categories.map(({ title, value }) => (
              <ToggleGroupItem key={value} value={value} size='sm'>
                {title}
              </ToggleGroupItem>
            ))}
          </div>
        </ToggleGroup>
      ))}
    </>
  );
}

export { RecipeTagsFilters };
