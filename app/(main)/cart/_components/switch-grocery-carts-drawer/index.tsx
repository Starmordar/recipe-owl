'use client';

import { DialogTitle } from '@radix-ui/react-dialog';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';

import {
  Drawer,
  DrawerActionButton,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { UserAvatar } from '@/components/ui/user-avatar';
import { publicUrls } from '@/config/url';
import { useUserCart } from '@/context/userCartProvider';

import type { PropsWithChildren } from 'react';

interface SwitchGroceryCartsDrawerProps extends PropsWithChildren {
  onSelect: () => void;
}

function SwitchGroceryCartsDrawer({ onSelect, children }: SwitchGroceryCartsDrawerProps) {
  const { sharedCarts } = useUserCart();

  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>

      <DrawerContent>
        <DialogTitle className='sr-only'>Switch Grocery Carts</DialogTitle>

        <ul className='my-4'>
          <li>
            <DrawerClose asChild>
              <Link href={publicUrls.cart} onClick={onSelect}>
                <DrawerActionButton>
                  <ShoppingCart className='w-7 h-7' />
                  My Grocery Cart
                </DrawerActionButton>
              </Link>
            </DrawerClose>
          </li>

          {sharedCarts.map(cart => (
            <li key={cart.id}>
              <DrawerClose asChild>
                <Link href={publicUrls.cartWithToken(cart.shareToken)} onClick={onSelect}>
                  <DrawerActionButton>
                    <UserAvatar src={cart.user.picture} />
                    <p>{cart.user.fullName}</p>
                  </DrawerActionButton>
                </Link>
              </DrawerClose>
            </li>
          ))}
        </ul>
      </DrawerContent>
    </Drawer>
  );
}

export default SwitchGroceryCartsDrawer;
