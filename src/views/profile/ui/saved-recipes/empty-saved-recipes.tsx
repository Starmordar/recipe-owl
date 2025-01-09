import { CookingPot } from 'lucide-react';
import { useTranslations } from 'next-intl';

function EmptySavedRecipes() {
  const t = useTranslations('ProfilePage');

  return (
    <div className='text-center space-y-2 flex flex-col pt-[10vh] items-center px-5'>
      <CookingPot className='h-20 w-20' />
      <h2 className='text-xl font-semibold'>{t('emptySavedTabTitle')}</h2>
      <p className='text-sm'>{t('emptySavedTabText')}</p>
    </div>
  );
}

export { EmptySavedRecipes };
