'use client';

import { DialogTitle } from '@radix-ui/react-dialog';
import { Pencil, Trash2 } from 'lucide-react';
import Link from 'next/link';

import { Drawer, DrawerActionButton, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';

import DeleteRecipeAlert from '../delete-recipe-alert';

import type { PropsWithChildren } from 'react';

interface RecipeActionsDrawerProps extends PropsWithChildren {
  recipeId: number;
}

function RecipeActionsDrawer({ children, recipeId }: RecipeActionsDrawerProps) {
  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>

      <DrawerContent>
        <DialogTitle className='sr-only'>Action Buttons</DialogTitle>

        <ul className='my-4'>
          <li>
            <Link href={`/recipes/${recipeId}/edit`}>
              <DrawerActionButton>
                <Pencil className='h-5 w-5 opacity-60' /> Edit Recipe
              </DrawerActionButton>
            </Link>
          </li>

          <li>
            <DeleteRecipeAlert recipeId={recipeId}>
              <DrawerActionButton>
                <Trash2 className='h-5 w-5 opacity-60' /> Delete Recipe
              </DrawerActionButton>
            </DeleteRecipeAlert>
          </li>
        </ul>
      </DrawerContent>
    </Drawer>
  );
}

export default RecipeActionsDrawer;
