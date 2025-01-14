import { SearchX } from 'lucide-react';
import { useTranslations } from 'next-intl';

function EmptySearchResults() {
  const t = useTranslations('RecipesPage');

  return (
    <div className='text-center space-y-2 flex flex-col pt-[15vh] items-center px-5'>
      <SearchX className='h-20 w-20' />
      <h2 className='text-3xl font-semibold'>{t('emptySearchResultsTitle')}</h2>
      <p>{t('emptySearchResultsText')}</p>
    </div>
  );
}

export { EmptySearchResults };
