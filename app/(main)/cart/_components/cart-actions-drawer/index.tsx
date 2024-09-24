'use client';

import { DialogTitle } from '@radix-ui/react-dialog';
import { AlignJustify, Trash2, CircleX } from 'lucide-react';
import { useState, type PropsWithChildren } from 'react';

import { Drawer, DrawerActionButton, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { useUserCart } from '@/context/userCartProvider';
import useLeaveSharedCart from '@/hooks/cart/useLeaveSharedCart';

import SwitchGroceryCartsDrawer from '../switch-grocery-carts-drawer';

interface CartActionsDrawerProps extends PropsWithChildren {}

function CartActionsDrawer({ children }: CartActionsDrawerProps) {
  const { cartId, userId, isCartOwner, sharedCarts } = useUserCart();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { handleLeaveCart, isPending } = useLeaveSharedCart({ userId, cartId });

  async function onLeaveCart() {
    await handleLeaveCart();
    setIsDrawerOpen(false);
  }

  return (
    <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>

      <DrawerContent>
        <DialogTitle className='sr-only'>Action Buttons</DialogTitle>

        <ul className='my-4'>
          <li>
            <DrawerActionButton>
              <CircleX className='h-5 w-5 opacity-60' /> Remove All Items
            </DrawerActionButton>
          </li>
          {!isCartOwner && (
            <li>
              <DrawerActionButton
                onClick={onLeaveCart}
                loading={isPending}
                loadingClassName='h-5 w-5'
              >
                <Trash2 className='h-5 w-5 opacity-60' /> Leave List
              </DrawerActionButton>
            </li>
          )}
          {sharedCarts.length > 0 && (
            <li>
              <SwitchGroceryCartsDrawer onSelect={() => setIsDrawerOpen(false)}>
                <DrawerActionButton>
                  <AlignJustify className='h-5 w-5 opacity-60' /> Switch Lists
                </DrawerActionButton>
              </SwitchGroceryCartsDrawer>
            </li>
          )}
        </ul>
      </DrawerContent>
    </Drawer>
  );
}

export default CartActionsDrawer;
