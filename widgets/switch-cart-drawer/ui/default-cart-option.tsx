'use client';

import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';

import { publicUrls } from '@/shared/config/url';
import { DrawerActionButton } from '@/shared/ui/drawer';

import type { PropsWithChildren } from 'react';

interface DefaultCartOptionProps extends PropsWithChildren {
  onSelect: () => void;
}

function DefaultCartOption({ onSelect }: DefaultCartOptionProps) {
  return (
    <Link href={publicUrls.cart} onClick={onSelect}>
      <DrawerActionButton>
        <ShoppingCart className='w-7 h-7' />
        My Grocery Cart
      </DrawerActionButton>
    </Link>
  );
}

export { DefaultCartOption };
