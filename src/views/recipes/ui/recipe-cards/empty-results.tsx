import { SearchX } from 'lucide-react';
import { useTranslations } from 'next-intl';

function EmptySearchResults() {
  const t = useTranslations('RecipesPage');

  return (
    <div className='flex flex-col items-center gap-y-1 px-5 pt-[10vh] text-center'>
      <div className='mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10'>
        <SearchX className='h-7 w-7 text-primary' aria-hidden='true' />
      </div>
      <h2 className='text-lg md:text-xl font-semibold'>{t('emptySearchResultsTitle')}</h2>
      <p className='max-w-xs text-sm text-muted-foreground'>{t('emptySearchResultsText')}</p>
    </div>
  );
}

export { EmptySearchResults };
