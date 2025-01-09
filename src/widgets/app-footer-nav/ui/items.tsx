'use client';

import Cookies from 'js-cookie';
import { ShoppingCart, User, Search, CirclePlus, House } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { shareTokenCookieName } from '@/src/entities/cart/config/share-token';
import { publicUrls } from '@/src/shared/config/url';

import type { NavbarItem } from '../model/types';

const items = (t: ReturnType<typeof useTranslations>): Array<NavbarItem> => [
  {
    title: t('home'),
    isTitleHidden: false,
    href: publicUrls.home,
    match: (pathname: string) => pathname === publicUrls.home,
    render: (_, className) => <House size={20} className={className} />,
  },
  {
    title: t('recipes'),
    isTitleHidden: false,
    href: publicUrls.recipes,
    match: (pathname: string) =>
      pathname.startsWith(publicUrls.recipes) && pathname !== publicUrls.newRecipe,
    render: (_, className) => <Search size={20} className={className} />,
  },
  {
    title: t('newRecipe'),
    isTitleHidden: true,
    href: publicUrls.newRecipe,
    render: (_, className) => <CirclePlus size={32} className={className} />,
  },
  {
    title: t('cart'),
    isTitleHidden: false,
    href: () => publicUrls.cartWithToken(Cookies.get(shareTokenCookieName)),
    match: (pathname: string) => pathname.startsWith(publicUrls.cart),
    render: (_, className) => <ShoppingCart size={20} className={className} />,
  },
  {
    title: t('profile'),
    isTitleHidden: false,
    href: publicUrls.profile,
    render: (user, className) => {
      if (!user?.picture) return <User size={20} className={className} />;

      return (
        <Image
          className='rounded-full'
          height={20}
          width={20}
          src={user.picture}
          alt={t('profilePictureAlt')}
        />
      );
    },
  },
];

export { items };
