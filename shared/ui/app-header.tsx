import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

import { cn } from '@/shared/lib/classnames';

interface AppHeaderProps {
  children: React.ReactNode;
  prevUrl?: string;
  className?: string;
}

function AppHeader({ children, prevUrl, className }: AppHeaderProps) {
  return (
    <header className='sticky top-0 mx-0 w-full z-50 bg-background'>
      <div className={cn(className, 'container flex items-center justify-between py-2')}>
        {prevUrl && (
          <Link href={prevUrl} aria-label='Return Back'>
            <ArrowLeft className='h-5 w-5' />
          </Link>
        )}

        {children}
      </div>
    </header>
  );
}

export default AppHeader;
