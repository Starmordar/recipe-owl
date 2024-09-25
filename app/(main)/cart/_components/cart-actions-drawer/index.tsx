'use client';

import { DialogTitle } from '@radix-ui/react-dialog';
import { AlignJustify, Trash2, CircleX, Lock } from 'lucide-react';
import { useState, type PropsWithChildren } from 'react';

import { Drawer, DrawerActionButton, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { useUserCart } from '@/context/userCartProvider';
import useLeaveSharedCart from '@/hooks/cart/useLeaveSharedCart';
import { useServerAction } from '@/hooks/useServerAction';

import { clearCart, disableCartSharing } from '../../actions';
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
