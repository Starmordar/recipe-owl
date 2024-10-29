'use client';

import { Switch } from '@/src/shared/ui/switch';

interface OnlySavedSectionProps {
  category: string;
  selected: Array<string>;
  onFilterChange: (category: string, values: Array<string>) => void;
}

function OnlySavedSection({ category, selected, onFilterChange }: OnlySavedSectionProps) {
  const [checked] = selected;

  function handleFilterChange(checked: boolean) {
    onFilterChange(category, checked ? ['true'] : []);
  }

  return (
    <div className='flex justify-between py-4'>
      <label htmlFor='category' className='text-base font-semibold leading-tight'>
        Recipes I&apos;ve Saved
      </label>
      <Switch id='category' checked={checked === 'true'} onCheckedChange={handleFilterChange} />
    </div>
  );
}

export { OnlySavedSection };
