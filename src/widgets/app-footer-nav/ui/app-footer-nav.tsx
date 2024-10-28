'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { userQueries } from '@/src/entities/user';
import { cn } from '@/src/shared/lib/classnames';

import { items } from './items';

import type { NavbarItem } from '../model/types';

function AppFooterNav() {
  const pathname = usePathname();
  const { data: user } = useQuery(userQueries.current());

  function isActiveLink(href: string, match: NavbarItem['match']) {
    if (match) return match(pathname);
    return pathname.startsWith(href);
  }

  return (
    <nav className='sticky bottom-0 w-full flex bg-background border-t'>
      {items.map(({ href, title, isTitleHidden, match, render }) => {
        const link = typeof href === 'string' ? href : href();
        const opacity = isActiveLink(link, match) ? 'opacity-100' : 'opacity-60';

        return (
          <Link
            key={link}
            href={link}
            className={cn('flex-1 flex justify-center items-center py-1 text-primary')}
            aria-label={title}
          >
            <div className='flex flex-col justify-center items-center'>
              {render(user, opacity)}
              {!isTitleHidden && <span className={cn('text-xs', opacity)}>{title}</span>}
            </div>
          </Link>
        );
      })}
    </nav>
  );
}

export { AppFooterNav };
