'use client';

import { DialogTitle } from '@radix-ui/react-dialog';
import { AlignJustify, Trash2, CircleX, Lock } from 'lucide-react';
import { useState, type PropsWithChildren } from 'react';

import { useUserCart } from '@/context/userCartProvider';
import { disableCartSharing } from '@/features/cart/disable-sharing';
import { useLeaveSharedCart } from '@/features/cart/leave-shared-cart';
import useServerAction from '@/shared/hooks/useServerAction';
import { Drawer, DrawerActionButton, DrawerContent, DrawerTrigger } from '@/shared/ui/drawer';

import { clearCart } from '../../actions';
import SwitchGroceryCartsDrawer from '../switch-grocery-carts-drawer';

interface CartActionsDrawerProps extends PropsWithChildren {}

function CartActionsDrawer({ children }: CartActionsDrawerProps) {
  const { cartId, userId, isCartOwner, sharedCarts } = useUserCart();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { handleLeaveCart, isPending } = useLeaveSharedCart({ userId, cartId });
  const [clearCartAction, isClearPending] = useServerAction(clearCart);
  const [disableSharingAction, isDisablePending] = useServerAction(disableCartSharing);

  async function onLeaveCart() {
    await handleLeaveCart();
    setIsDrawerOpen(false);
  }

  async function onClearCart() {
    await clearCartAction(cartId);
    setIsDrawerOpen(false);
  }

  async function onDisableSharing() {
    await disableSharingAction(cartId);
    setIsDrawerOpen(false);
  }

  return (
    <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>

      <DrawerContent>
        <DialogTitle className='sr-only'>Action Buttons</DialogTitle>

        <ul className='my-4'>
          <li>
            <DrawerActionButton
              onClick={onClearCart}
              loading={isClearPending}
              loadingClassName='h-5 w-5'
            >
              <CircleX className='h-5 w-5 opacity-60' /> Remove All Items
            </DrawerActionButton>
          </li>
          {isCartOwner && (
            <li>
              <DrawerActionButton
                onClick={onDisableSharing}
                loading={isDisablePending}
                loadingClassName='h-5 w-5'
              >
                <Lock className='h-5 w-5 opacity-60' /> Disable Sharing
              </DrawerActionButton>
            </li>
          )}
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
