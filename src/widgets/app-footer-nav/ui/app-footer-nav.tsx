'use client';

import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

import { userQueries } from '@/src/entities/user';
import { usePathname, Link } from '@/src/shared/i18n/routing';
import { cn } from '@/src/shared/lib/classnames';

import { items as navbarItems } from './items';

import type { NavbarItem } from '../model/types';

function AppFooterNav() {
  const t = useTranslations('Common.NavBar');
  const pathname = usePathname();
  const { data: user } = useQuery(userQueries.current());

  function isActiveLink(href: string, match: NavbarItem['match']) {
    if (match) return match(pathname);
    return pathname.startsWith(href);
  }

  const items = useMemo(() => {
    return navbarItems(t);
  }, [t]);

  return (
    <nav className='sticky bottom-0 w-full flex justify-center bg-background border-t z-50'>
      {items.map(({ href, title, isTitleHidden, match, render }) => {
        const link = typeof href === 'string' ? href : href();
        const opacity = isActiveLink(link, match) ? 'opacity-100' : 'opacity-55';

        return (
          <Link
            key={link}
            href={link}
            className={cn('flex-1 max-w-24 flex justify-center items-center py-1')}
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
