import { useTranslations } from 'next-intl';

import AppHeaderClient from '@/src/shared/ui/app-header-client';
import { Button } from '@/src/shared/ui/button';

interface RecipeFormHeaderProps {
  isPending: boolean;
  dataChanged: boolean;
  title: string;
  prevUrl?: string;
}

function RecipeFormHeader({ isPending, dataChanged, title, prevUrl }: RecipeFormHeaderProps) {
  const t = useTranslations('RecipeForm');

  return (
    <AppHeaderClient prevUrl={prevUrl} replacePrevUrl>
      <div className='flex justify-between grow items-center ml-5'>
        <h1 className='text-lg font-semibold leading-none'>{title}</h1>

        <Button
          form='recipe-form'
          size='xss'
          className='px-3 text-base'
          disabled={!dataChanged}
          loading={isPending}
          loadingText={t('savePending')}
        >
          {t('save')}
        </Button>
      </div>
    </AppHeaderClient>
  );
}

export { RecipeFormHeader };
