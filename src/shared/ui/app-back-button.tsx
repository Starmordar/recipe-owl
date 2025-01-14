'use client';

import { ArrowLeft } from 'lucide-react';

import { useRouter } from '@/src/shared/i18n/routing';

import { Button } from './button';

interface AppBackButtonProps {
  url?: string;
  replace?: boolean;
  goBack?: boolean;
  fallbackUrl: string;
}

function AppBackButton({ url, replace, goBack, fallbackUrl }: AppBackButtonProps) {
  const router = useRouter();

  function navigateBack() {
    const routerNext = replace ? router.replace : router.push;

    if (goBack) router.back();
    else if (url) routerNext(url);
    else routerNext(fallbackUrl);
  }

  return (
    <Button onClick={navigateBack} size='icon-xs' variant='ghost' className='h-6 w-6'>
      <ArrowLeft className='h-6 w-6' />
    </Button>
  );
}

export { AppBackButton };
