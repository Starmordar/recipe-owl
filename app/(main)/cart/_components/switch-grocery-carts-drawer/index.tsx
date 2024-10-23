'use client';

import { DialogTitle } from '@radix-ui/react-dialog';
import Cookies from 'js-cookie';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';

import { useUserCart } from '@/context/userCartProvider';
import { publicUrls } from '@/shared/config/url';
import {
  Drawer,
  DrawerActionButton,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from '@/shared/ui/drawer';
import { UserAvatar } from '@/shared/ui/user-avatar';

import type { PropsWithChildren } from 'react';

interface SwitchGroceryCartsDrawerProps extends PropsWithChildren {
  onSelect: () => void;
}

function SwitchGroceryCartsDrawer({ onSelect, children }: SwitchGroceryCartsDrawerProps) {
  const { sharedCarts } = useUserCart();

  function handleChangeCart(shareToken?: string | null) {
    Cookies.set('shareToken', shareToken ?? '', { path: '/' });
    onSelect();
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>

      <DrawerContent>
        <DialogTitle className='sr-only'>Switch Grocery Carts</DialogTitle>

        <ul className='my-4'>
          <li>
            <DrawerClose asChild>
              <Link href={publicUrls.cart} onClick={() => handleChangeCart()}>
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
                <Link
                  href={publicUrls.cartWithToken(cart.shareToken)}
                  onClick={() => handleChangeCart(cart.shareToken)}
                >
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
