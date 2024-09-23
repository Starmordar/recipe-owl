'use client';

import { DialogTitle } from '@radix-ui/react-dialog';
import { AlignJustify, Trash2, CircleX } from 'lucide-react';

import {
  Drawer,
  DrawerActionButton,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from '@/components/ui/drawer';
import useLeaveSharedCart from '@/hooks/cart/useLeaveSharedCart';

import SwitchListsDrawer from '../switch-lists-drawer';

import type { CartWithUser } from '@/types/api';
import type { PropsWithChildren } from 'react';

interface CartActionsDrawerProps extends PropsWithChildren {
  userId: string;
  cartId: number;
  isCartOwner: boolean;
  availableCarts: Array<CartWithUser>;
}

function CartActionsDrawer({
  children,
  cartId,
  userId,
  isCartOwner,
  availableCarts,
}: CartActionsDrawerProps) {
  const { handleLeaveCart, isPending } = useLeaveSharedCart({ userId, cartId });

  return (
    <Drawer>
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
                onClick={handleLeaveCart}
                loading={isPending}
                loadingClassName='h-5 w-5'
              >
                <Trash2 className='h-5 w-5 opacity-60' /> Leave List
              </DrawerActionButton>
            </li>
          )}
          <li>
            <SwitchListsDrawer carts={availableCarts}>
              <DrawerActionButton>
                <AlignJustify className='h-5 w-5 opacity-60' /> Switch Lists
              </DrawerActionButton>
            </SwitchListsDrawer>
          </li>
        </ul>
      </DrawerContent>
    </Drawer>
  );
}

export default CartActionsDrawer;
