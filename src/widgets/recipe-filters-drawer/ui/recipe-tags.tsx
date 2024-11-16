'use client';

import { useQuery } from '@tanstack/react-query';

import { recipeQueries } from '@/src/entities/recipe';
import { ToggleGroup, ToggleGroupItem } from '@/src/shared/ui/toggle-group';

import type { SelectedFilters } from '../model/types';

interface RecipeTagsProps {
  filters: SelectedFilters;
  onFilterChange: (category: string, value: Array<string>) => void;
}

function RecipeTags({ filters, onFilterChange }: RecipeTagsProps) {
  const { data: tags } = useQuery(recipeQueries.searchTags(''));

  return (
    <>
      {tags?.map(tag => (
        <ToggleGroup
          key={tag.type}
          value={filters[tag.type]}
          onValueChange={value => onFilterChange(tag.type, value)}
          type='multiple'
          variant='outline'
          className='flex flex-col flex-wrap items-start gap-2 py-4'
        >
          <p className='font-semibold text-lg'>{tag.type}</p>
          <div className='flex flex-wrap justify-start gap-2'>
            {tag.categories.map(category => (
              <ToggleGroupItem
                key={category}
                value={category}
                size='sm'
                className='data-[state=on]:border-primary'
              >
                {category}
              </ToggleGroupItem>
            ))}
          </div>
        </ToggleGroup>
      ))}
    </>
  );
}

export { RecipeTags };
