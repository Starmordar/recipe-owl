import { Save } from 'lucide-react';

import { Button } from '@/components/ui/button';

import AppHeader from '../app-header';

interface RecipeDetailsFormHeader {
  isPending: boolean;
  dataChanged: boolean;
  title: string;
  prevUrl: string;
}

function RecipeDetailsFormHeader({
  isPending,
  dataChanged,
  title,
  prevUrl,
}: RecipeDetailsFormHeader) {
  return (
    <AppHeader prevUrl={prevUrl}>
      <h1 className='text-lg font-semibold leading-none ml-10'>{title}</h1>

      <Button
        form='recipe-form'
        size='xss'
        variant='default'
        className='gap-2 px-3'
        disabled={!dataChanged}
        loading={isPending}
        loadingText='Saving...'
      >
        Save <Save className='h-4 w-4' />
      </Button>
    </AppHeader>
  );
}

export default RecipeDetailsFormHeader;
