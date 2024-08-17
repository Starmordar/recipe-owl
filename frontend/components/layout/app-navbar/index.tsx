'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

import { navbarItems } from './constants';
import { NavbarItem } from './types';

function AppNavbar() {
  const pathname = usePathname();

  function isActiveLink(href: string, match: NavbarItem['match']) {
    if (match) return match(pathname);
    return pathname.startsWith(href);
  }

  return (
    <nav className='sticky bottom-0 w-full flex bg-background border-t'>
      {navbarItems.map(({ href, Icon, title, match }) => (
        <Link
          key={href}
          href={href}
          className={cn(
            'flex-1 flex justify-center items-center py-1 text-primary opacity-50',
            isActiveLink(href, match) ? 'opacity-100' : '',
          )}
        >
          <div className='flex flex-col justify-center items-center'>
            <Icon size={title ? 20 : 28} />
            <span className='text-xs'>{title}</span>
          </div>
        </Link>
      ))}
    </nav>
  );
}

export default AppNavbar;
