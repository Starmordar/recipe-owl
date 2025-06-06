'use client';

import { ShoppingCart } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { publicUrls } from '@/src/shared/config/url';
import { Link } from '@/src/shared/i18n/routing';
import { DrawerActionButton } from '@/src/shared/ui/drawer';

import type { PropsWithChildren } from 'react';

interface DefaultCartOptionProps extends PropsWithChildren {
  onSelect: () => void;
}

function DefaultCartOption({ onSelect }: DefaultCartOptionProps) {
  const t = useTranslations('CartPage.ActionsDrawer');

  return (
    <Link href={publicUrls.cart} onClick={onSelect}>
      <DrawerActionButton>
        <ShoppingCart className='w-7 h-7' />
        {t('myCartOption')}
      </DrawerActionButton>
    </Link>
  );
}

export { DefaultCartOption };
