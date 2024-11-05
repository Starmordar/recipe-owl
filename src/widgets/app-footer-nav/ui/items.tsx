'use client';

import Cookies from 'js-cookie';
import { ShoppingCart, User, Search, CirclePlus, House } from 'lucide-react';
import Image from 'next/image';

import { shareTokenCookieName } from '@/src/entities/cart/config/share-token';
import { publicUrls } from '@/src/shared/config/url';

import type { NavbarItem } from '../model/types';

const items: Array<NavbarItem> = [
  {
    title: 'Home',
    isTitleHidden: false,
    href: '/',
    match: (pathname: string) => pathname === publicUrls.home,
    render: (_, className) => <House size={20} className={className} />,
  },
  {
    title: 'Discover',
    isTitleHidden: false,
    href: publicUrls.recipes,
    match: (pathname: string) =>
      pathname.startsWith(publicUrls.recipes) && pathname !== publicUrls.newRecipe,
    render: (_, className) => <Search size={20} className={className} />,
  },
  {
    title: 'New Recipe',
    isTitleHidden: true,
    href: publicUrls.newRecipe,
    render: (_, className) => <CirclePlus size={28} className={className} />,
  },
  {
    title: 'My Cart',
    isTitleHidden: false,
    href: () => publicUrls.cartWithToken(Cookies.get(shareTokenCookieName)),
    match: (pathname: string) => pathname.startsWith(publicUrls.cart),
    render: (_, className) => <ShoppingCart size={20} className={className} />,
  },
  {
    title: 'Profile',
    isTitleHidden: false,
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

export { items };
