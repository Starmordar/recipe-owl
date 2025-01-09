'use client';

import { DialogTitle } from '@radix-ui/react-dialog';
import { useTranslations } from 'next-intl';
import { type PropsWithChildren } from 'react';

import { storeShareToken, useCart } from '@/src/entities/cart';
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from '@/src/shared/ui/drawer';

import { CartOption } from './cart-option';
import { DefaultCartOption } from './default-cart-option';

interface SwitchCartDrawerProps extends PropsWithChildren {
  onSelect: () => void;
}

function SwitchCartDrawer({ onSelect, children }: SwitchCartDrawerProps) {
  const t = useTranslations('CartPage.ActionsDrawer');
  const { sharedCarts } = useCart();

  function handleChangeCart(shareToken?: string | null) {
    storeShareToken(shareToken);
    onSelect();
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>

      <DrawerContent>
        <DialogTitle className='sr-only'>{t('switchListsTitle')}</DialogTitle>

        <ul className='my-4'>
          <li>
            <DrawerClose asChild>
              <DefaultCartOption onSelect={() => handleChangeCart()} />
            </DrawerClose>
          </li>

          {sharedCarts.map(cart => (
            <li key={cart.id}>
              <DrawerClose asChild>
                <CartOption cart={cart} onSelect={() => handleChangeCart(cart.shareToken)} />
              </DrawerClose>
            </li>
          ))}
        </ul>
      </DrawerContent>
    </Drawer>
  );
}

export { SwitchCartDrawer };
