'use client';

import { DialogTitle } from '@radix-ui/react-dialog';
import NextImage from 'next/image';
import Link from 'next/link';

import {
  Drawer,
  DrawerActionButton,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { publicUrls } from '@/config/url';

import type { CartWithUser } from '@/types/api';
import type { PropsWithChildren } from 'react';

interface SwitchListsDrawerProps extends PropsWithChildren {
  carts: Array<CartWithUser>;
}

function SwitchListsDrawer({ children, carts }: SwitchListsDrawerProps) {
  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>

      <DrawerContent>
        <DialogTitle className='sr-only'>Action Buttons</DialogTitle>

        <ul className='my-4'>
          {carts.map(cart => (
            <li key={cart.id}>
              <Link href={`${publicUrls.cart}/?shareToken=${cart.shareToken}`}>
                <DrawerClose>
                  <DrawerActionButton>
                    {cart.user.picture ? (
                      <NextImage
                        className='rounded-full'
                        height={28}
                        width={28}
                        src={cart.user.picture}
                        alt='Profile Picture'
                      />
                    ) : (
                      <div className='h-6 w-6 rounded-full bg-purple-600'></div>
                    )}

                    <p>{cart.user.fullName}</p>
                  </DrawerActionButton>
                </DrawerClose>
              </Link>
            </li>
          ))}
        </ul>
      </DrawerContent>
    </Drawer>
  );
}

export default SwitchListsDrawer;
