import { Button } from '@/components/ui/button';

import AppHeader from '../app-header';

interface RecipeDetailsFormHeader {
  title: string;
  prevUrl: string;
}

function RecipeDetailsFormHeader({ title, prevUrl }: RecipeDetailsFormHeader) {
  return (
    <AppHeader prevUrl={prevUrl}>
      <h1 className='text-lg font-semibold leading-none ml-10'>{title}</h1>

      <Button form='recipe-form' size='xss' variant='default' className='px-3'>
        Save
      </Button>
    </AppHeader>
  );
}

export default RecipeDetailsFormHeader;
