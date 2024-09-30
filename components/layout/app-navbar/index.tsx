'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { getCurrentUser } from '@/lib/data/user';
import { cn } from '@/lib/utils';

import { navbarItems } from './constants';
import { NavbarItem } from './types';

function AppNavbar() {
  const pathname = usePathname();

  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
  });

  function isActiveLink(href: string, match: NavbarItem['match']) {
    if (match) return match(pathname);
    return pathname.startsWith(href);
  }

  return (
    <nav className='sticky bottom-0 w-full flex bg-background border-t'>
      {navbarItems.map(({ href, title, hideTitle, match, render }) => {
        const link = typeof href === 'string' ? href : href();
        return (
          <Link
            key={link}
            href={link}
            className={cn('flex-1 flex justify-center items-center py-1 text-primary')}
            aria-label={title}
          >
            <div className='flex flex-col justify-center items-center'>
              {render(user, isActiveLink(link, match) ? 'opacity-100' : 'opacity-60')}

              {!hideTitle && (
                <span
                  className={cn(
                    'text-xs',
                    isActiveLink(link, match) ? 'opacity-100' : 'opacity-60',
                  )}
                >
                  {title}
                </span>
              )}
            </div>
          </Link>
        );
      })}
    </nav>
  );
}

export default AppNavbar;
