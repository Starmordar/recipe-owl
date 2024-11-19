'use client';

import { cn } from '@/src/shared/lib/classnames';

import { AppBackButton } from './app-back-button';

interface AppHeaderClientProps {
  children: React.ReactNode;
  prevUrl?: string;
  replacePrevUrl?: boolean;
  className?: string;
}

function AppHeaderClient({ children, prevUrl, replacePrevUrl, className }: AppHeaderClientProps) {
  return (
    <header className='sticky top-0 mx-0 w-full z-50 bg-background'>
      <div className={cn(className, 'container flex items-center justify-between py-2')}>
        {prevUrl && <AppBackButton fallbackUrl={prevUrl} replace={replacePrevUrl} />}
        {children}
      </div>
    </header>
  );
}

export default AppHeaderClient;
