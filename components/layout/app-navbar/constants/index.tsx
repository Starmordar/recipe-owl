import { User as SessionUser } from 'lucia';
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
    render: () => <House size={20} />,
  },
  {
    title: 'Discover',
    href: publicUrls.recipes,
    match: (pathname: string) => {
      return pathname.startsWith(publicUrls.recipes) && pathname !== publicUrls.newRecipe;
    },
    render: () => <Search size={20} />,
  },
  {
    title: '',
    href: publicUrls.newRecipe,
    render: () => <CirclePlus size={28} />,
  },
  {
    title: 'My Cart',
    href: '/cart',
    render: () => <ShoppingCart size={20} />,
  },
  {
    title: 'Profile',
    href: '/profile',
    render: (user?: null | SessionUser) => {
      if (!user?.picture) return <User />;
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
