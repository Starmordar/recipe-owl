'use client';

import { useQuery } from '@tanstack/react-query';

import { recipeQueries } from '@/src/entities/recipe';
import { ToggleGroup, ToggleGroupItem } from '@/src/shared/ui/toggle-group';

import { RecipeTagsFiltersSkeleton } from './skeleton';

import type { SelectedFilters } from '../../model/types';

interface RecipeTagsFiltersProps {
  filters: SelectedFilters;
  onFilterChange: (category: string, value: Array<string>) => void;
}

function RecipeTagsFilters({ filters, onFilterChange }: RecipeTagsFiltersProps) {
  const { data: tags, isLoading } = useQuery(recipeQueries.searchTags(''));

  if (isLoading) return <RecipeTagsFiltersSkeleton />;

  return (
    <>
      {tags?.map(tag => (
        <ToggleGroup
          key={tag.type}
          value={filters[tag.type]}
          onValueChange={value => onFilterChange(tag.type, value)}
          type='multiple'
          variant='outline'
          className='flex flex-col items-start gap-2 py-4 last:pb-0'
        >
          <p className='font-semibold text-lg'>{tag.type}</p>

          <div className='flex flex-wrap justify-start gap-2'>
            {tag.categories.map(category => (
              <ToggleGroupItem key={category} value={category} size='sm'>
                {category}
              </ToggleGroupItem>
            ))}
          </div>
        </ToggleGroup>
      ))}
    </>
  );
}

export { RecipeTagsFilters };
