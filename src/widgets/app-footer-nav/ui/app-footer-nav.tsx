'use client';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

import logo from '@/public/icon.svg';
import { userQueries } from '@/src/entities/user';
import { publicUrls } from '@/src/shared/config/url';
import { usePathname, Link } from '@/src/shared/i18n/routing';
import { cn } from '@/src/shared/lib/classnames';

import { items as navbarItems } from './items';

import type { NavbarItem } from '../model/types';

// A tab bar at the bottom of the screen that turns into a rail on the left from `lg` up.
function AppFooterNav() {
  const t = useTranslations('Common.NavBar');
  const tApp = useTranslations('Metadata.App');
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
    <nav
      className={cn(
        'sticky bottom-0 w-full flex justify-center bg-background border-t z-50',
        'lg:fixed lg:inset-y-0 lg:left-0 lg:w-20 lg:flex-col lg:justify-start lg:gap-y-2 lg:overflow-y-auto lg:border-t-0 lg:border-r lg:py-2',
      )}
    >
      <Link href={publicUrls.home} className='hidden justify-center pb-2 lg:flex'>
        <Image src={logo} alt={tApp('title')} width={40} height={40} />
      </Link>

      {items.map(({ href, title, isTitleHidden, match, render }) => {
        const link = typeof href === 'string' ? href : href();
        const opacity = isActiveLink(link, match) ? 'opacity-100' : 'opacity-55';

        return (
          <Link
            key={link}
            href={link}
            className={cn(
              'flex-1 max-w-24 flex justify-center items-center py-1',
              'lg:flex-none lg:max-w-none lg:py-2',
            )}
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
