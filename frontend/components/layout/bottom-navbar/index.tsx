'use client';

import { ShoppingCart, User, Search, CirclePlus, House } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cloneElement } from 'react';

import { cn } from '@/lib/utils';

type MenuItem = { title?: string; href: string; icon: React.JSX.Element };

const menuItems: Array<MenuItem> = [
  { title: 'Home', href: '/home', icon: <House /> },
  { title: 'Discover', href: '/recipes', icon: <Search /> },
  { href: '/recipes/new', icon: <CirclePlus /> },
  { title: 'My Cart', href: '/cart', icon: <ShoppingCart /> },
  { title: 'Profile', href: '/profile', icon: <User /> },
];

export default function BottomNavbar() {
  const pathname = usePathname();

  function isActiveLink(href: string) {
    return pathname.startsWith(href);
  }

  return (
    <div className='flex bg-background border-t'>
      {menuItems.map(item => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            'flex-1 flex justify-center items-center py-1 text-primary opacity-50',
            isActiveLink(item.href) ? 'opacity-100' : '',
          )}
        >
          <div className='flex flex-col justify-center items-center'>
            {cloneElement(item.icon, { size: item.title ? 20 : 28 })}
            <span className='text-xs'>{item.title}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
