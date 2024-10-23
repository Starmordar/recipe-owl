import AppHeader from '@/shared/ui/app-header';
import { Button } from '@/shared/ui/button';

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
      <div className='flex justify-between grow items-center ml-5'>
        <h1 className='text-lg font-semibold leading-none'>{title}</h1>

        <Button
          form='recipe-form'
          size='xss'
          className='px-3'
          disabled={!dataChanged}
          loading={isPending}
          loadingText='Saving...'
        >
          Save
        </Button>
      </div>
    </AppHeader>
  );
}

export default RecipeDetailsFormHeader;
