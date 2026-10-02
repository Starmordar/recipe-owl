'use client';

import { ArrowLeft } from 'lucide-react';

import { useRouter } from '@/src/shared/i18n/routing';
import { cn } from '@/src/shared/lib/classnames';

import { Button } from './button';

import type { PropsWithChildren } from 'react';

interface AppBackButtonProps extends PropsWithChildren {
  url?: string;
  replace?: boolean;
  goBack?: boolean;
  fallbackUrl: string;
  className?: string;
}

function AppBackButton({
  url,
  replace,
  goBack,
  fallbackUrl,
  className,
  children,
}: AppBackButtonProps) {
  const router = useRouter();

  function navigateBack() {
    const routerNext = replace ? router.replace : router.push;

    if (goBack) router.back();
    else if (url) routerNext(url);
    else routerNext(fallbackUrl);
  }

  return (
    <Button
      onClick={navigateBack}
      size='icon-xs'
      variant='ghost'
      className={cn('h-6 w-6', className)}
    >
      <ArrowLeft className='h-6 w-6' />
      {children}
    </Button>
  );
}

export { AppBackButton };
