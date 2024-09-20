'use client';

import { DialogTitle } from '@radix-ui/react-dialog';
import { CircleX } from 'lucide-react';

import { Drawer, DrawerActionButton, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';

import type { PropsWithChildren } from 'react';

interface CartActionsDrawerProps extends PropsWithChildren {
  userId: string;
}

function CartActionsDrawer({ children, userId }: CartActionsDrawerProps) {
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
        </ul>
      </DrawerContent>
    </Drawer>
  );
}

export default CartActionsDrawer;
