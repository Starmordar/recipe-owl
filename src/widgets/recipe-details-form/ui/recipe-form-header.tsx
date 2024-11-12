import AppHeader from '@/src/shared/ui/app-header';
import { Button } from '@/src/shared/ui/button';

interface RecipeFormHeaderProps {
  isPending: boolean;
  dataChanged: boolean;
  title: string;
  prevUrl: string;
}

function RecipeFormHeader({ isPending, dataChanged, title, prevUrl }: RecipeFormHeaderProps) {
  return (
    <AppHeader prevUrl={prevUrl}>
      <div className='flex justify-between grow items-center ml-5'>
        <h1 className='text-lg font-semibold leading-none'>{title}</h1>

        <Button
          form='recipe-form'
          size='xss'
          className='px-3 text-base'
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

export { RecipeFormHeader };
