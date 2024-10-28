'use client';

import Link from 'next/link';

import { publicUrls } from '@/src/shared/config/url';
import { DrawerActionButton } from '@/src/shared/ui/drawer';
import { UserAvatar } from '@/src/shared/ui/user-avatar';

import type { CartWithUser } from '@/src/entities/cart';
import type { PropsWithChildren } from 'react';

interface CartOptionProps extends PropsWithChildren {
  cart: CartWithUser;
  onSelect: () => void;
}

function CartOption({ onSelect, cart }: CartOptionProps) {
  return (
    <Link href={publicUrls.cartWithToken(cart.shareToken)} onClick={onSelect}>
      <DrawerActionButton>
        <UserAvatar src={cart.user.picture} />
        <p>{cart.user.fullName}</p>
      </DrawerActionButton>
    </Link>
  );
}

export { CartOption };
