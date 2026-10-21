import { CookingPot } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { publicUrls } from '@/src/shared/config/url';
import { Link } from '@/src/shared/i18n/routing';
import { Button } from '@/src/shared/ui/button';

function EmptyCreatedRecipes() {
  const t = useTranslations('ProfilePage.Tabs');

  return (
    <div className='flex flex-col items-center gap-y-1 px-5 pt-[10vh] text-center'>
      <div className='mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10'>
        <CookingPot className='h-7 w-7 text-primary' aria-hidden='true' />
      </div>
      <h2 className='text-lg md:text-xl font-semibold'>{t('emptyCreatedRecipesTitle')}</h2>
      <p className='max-w-xs text-sm text-muted-foreground'>{t('emptyCreatedRecipesText')}</p>

      <Button className='mt-3 rounded-full' size='xs' asChild>
        <Link href={publicUrls.newRecipe}>{t('createRecipeAction')}</Link>
      </Button>
    </div>
  );
}

export { EmptyCreatedRecipes };
