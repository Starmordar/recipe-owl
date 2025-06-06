import { headers } from 'next/headers';

import { cn } from '@/src/shared/lib/classnames';

import { AppBackButton } from './app-back-button';

interface AppHeaderProps {
  children: React.ReactNode;
  prevUrl?: string;
  className?: string;
}

async function AppHeader({ children, prevUrl, className }: AppHeaderProps) {
  const headersList = await headers();
  const referer = headersList.get('referer');

  return (
    <header className='sticky top-0 mx-0 w-full z-50 bg-background'>
      <div className={cn(className, 'container flex items-center justify-between py-2')}>
        {prevUrl && <AppBackButton goBack={!!referer} fallbackUrl={prevUrl} />}
        {children}
      </div>
    </header>
  );
}

export default AppHeader;
