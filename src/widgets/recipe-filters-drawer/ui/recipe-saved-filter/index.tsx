'use client';

import { onlySavedCategory } from '@/src/entities/recipe';
import { Switch } from '@/src/shared/ui/switch';

interface RecipeSavedFilterProps {
  selected: Array<string>;
  onFilterChange: (category: string, values: Array<string>) => void;
}

function RecipeSavedFilter({ selected, onFilterChange }: RecipeSavedFilterProps) {
  const [checked] = selected;

  function handleFilterChange(checked: boolean) {
    onFilterChange(onlySavedCategory, checked ? ['true'] : []);
  }

  return (
    <div className='flex justify-between py-4'>
      <label htmlFor='only-saved' className='text-lg font-semibold leading-tight'>
        Recipes I&apos;ve Saved
      </label>
      <Switch id='only-saved' checked={checked === 'true'} onCheckedChange={handleFilterChange} />
    </div>
  );
}

export { RecipeSavedFilter };
