'use client';

import Cookies from 'js-cookie';
import { ShoppingCart, User, Search, CirclePlus, House } from 'lucide-react';
import Image from 'next/image';

import { publicUrls } from '@/config/url';

import type { NavbarItem } from '../types';

const navbarItems: Array<NavbarItem> = [
  {
    title: 'Home',
    href: '/',
    match: (pathname: string) => {
      return pathname === publicUrls.home;
    },
    render: (_, className) => <House size={20} className={className} />,
  },
  {
    title: 'Discover',
    href: publicUrls.recipes,
    match: (pathname: string) => {
      return pathname.startsWith(publicUrls.recipes) && pathname !== publicUrls.newRecipe;
    },
    render: (_, className) => <Search size={20} className={className} />,
  },
  {
    title: '',
    href: publicUrls.newRecipe,
    render: (_, className) => <CirclePlus size={28} className={className} />,
  },
  {
    title: 'My Cart',
    href: () => {
      const shareToken = Cookies.get('shareToken');
      return publicUrls.cartWithToken(shareToken);
    },
    render: (_, className) => <ShoppingCart size={20} className={className} />,
  },
  {
    title: 'Profile',
    href: '/profile',
    render: (user, className) => {
      if (!user?.picture) return <User className={className} />;
      return (
        <Image
          className='rounded-full'
          height={20}
          width={20}
          src={user.picture}
          alt='Profile Picture'
        />
      );
    },
  },
];

export { navbarItems };
