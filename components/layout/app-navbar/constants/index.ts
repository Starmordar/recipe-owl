import { ShoppingCart, User, Search, CirclePlus, House } from 'lucide-react';

import { publicUrls } from '@/config/url';

import type { NavbarItem } from '../types';

const navbarItems: Array<NavbarItem> = [
  {
    title: 'Home',
    href: '/',
    match: (pathname: string) => {
      return pathname === publicUrls.home;
    },
    Icon: House,
  },
  {
    title: 'Discover',
    href: publicUrls.recipes,
    match: (pathname: string) => {
      return pathname.startsWith(publicUrls.recipes) && pathname !== publicUrls.newRecipe;
    },
    Icon: Search,
  },
  {
    title: '',
    href: publicUrls.newRecipe,
    Icon: CirclePlus,
  },
  {
    title: 'My Cart',
    href: '/cart',
    Icon: ShoppingCart,
  },
  {
    title: 'Profile',
    href: '/profile',
    Icon: User,
  },
];

export { navbarItems };
