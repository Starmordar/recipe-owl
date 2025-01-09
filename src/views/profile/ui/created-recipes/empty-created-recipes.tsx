import { CookingPot } from 'lucide-react';
import { useTranslations } from 'next-intl';

function EmptyCreatedRecipes() {
  const t = useTranslations('ProfilePage');

  return (
    <div className='text-center space-y-2 flex flex-col pt-[10vh] items-center px-5'>
      <CookingPot className='h-20 w-20' />
      <h2 className='text-xl font-semibold'>{t('emptyCreatedTabTitle')}</h2>
      <p className='text-sm'>{t('emptyCreatedTabText')}</p>
    </div>
  );
}

export { EmptyCreatedRecipes };
