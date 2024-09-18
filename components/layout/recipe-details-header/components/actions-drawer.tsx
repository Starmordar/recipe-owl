'use client';

import { EllipsisVertical, Pencil, Trash2 } from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';

import DeleteRecipeAlert from './delete-recipe-btn';

interface ActionsDrawerProps {
  recipeId: number;
}

function ActionsDrawer({ recipeId }: ActionsDrawerProps) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className='relative rounded-full' variant='ghost' size='icon-xs'>
          <EllipsisVertical className='w-5 h-5' />
        </Button>
      </DrawerTrigger>

      <DrawerContent>
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

function ActionButton({ children }: React.PropsWithChildren) {
  return (
    <Button
      className='flex gap-4 w-full rounded-none justify-start font-normal text-base h-12'
      variant='ghost'
    >
      {children}
    </Button>
  );
}

export default ActionsDrawer;
