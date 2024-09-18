'use client';

import { DialogTitle } from '@radix-ui/react-dialog';
import { EllipsisVertical, Pencil, Trash2 } from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';

import HeaderIconButton from '../../app-header/components/icon-button';

import DeleteRecipeAlert from './delete-recipe-alert';

interface ActionsDrawerProps {
  recipeId: number;
}

function ActionsDrawer({ recipeId }: ActionsDrawerProps) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <HeaderIconButton Icon={<EllipsisVertical className='w-5 h-5' />} />
      </DrawerTrigger>

      <DrawerContent>
        <DialogTitle className='sr-only'>Action Buttons</DialogTitle>

        <ul className='my-4'>
          <li>
            <Link href={`/recipes/${recipeId}/edit`}>
              <ActionButton>
                <Pencil className='h-5 w-5 opacity-60' /> Edit Recipe
              </ActionButton>
            </Link>
          </li>

          <li>
            <DeleteRecipeAlert recipeId={recipeId}>
              <ActionButton>
                <Trash2 className='h-5 w-5 opacity-60' /> Delete Recipe
              </ActionButton>
            </DeleteRecipeAlert>
          </li>
        </ul>
      </DrawerContent>
    </Drawer>
  );
}

interface ActionButtonProps extends React.PropsWithChildren {}

const ActionButton = React.forwardRef<HTMLButtonElement, ActionButtonProps>(
  ({ children, ...props }: ActionButtonProps, ref) => {
    return (
      <Button
        ref={ref}
        className='flex gap-4 w-full rounded-none justify-start font-normal text-base h-12'
        variant='ghost'
        {...props}
      >
        {children}
      </Button>
    );
  },
);

ActionButton.displayName = 'ActionButton';
export default ActionsDrawer;
