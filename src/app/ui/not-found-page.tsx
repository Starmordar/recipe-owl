import { useTranslations } from 'next-intl';

import { publicUrls } from '@/src/shared/config/url';
import { Link } from '@/src/shared/i18n/routing';
import { Button } from '@/src/shared/ui/button';
import { AppFooterNav } from '@/src/widgets/app-footer-nav';

function NotFoundPage() {
  const t = useTranslations('NotFoundPage');

  return (
    <>
      <main className='page-container relative px-4 overflow-x-hidden gap-0'>
        <div className='flex flex-col items-center absolute inset-x-0 top-1/3 text-center'>
          <h1 className='text-3xl font-semibold leading-tight tracking-tight md:text-5xl'>
            {t('title')}
          </h1>
          <div className='mt-6 md:text-lg max-w-xl'>{t('description')}</div>
          <div className='flex justify-center mt-4'>
            <Link href={publicUrls.home}>
              <Button variant='outline' size='lg'>
                {t('linkTitle')}
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <AppFooterNav />
    </>
  );
}

export { NotFoundPage };
