'use client';

import { DialogTitle } from '@radix-ui/react-dialog';
import { Pencil, Trash2 } from 'lucide-react';
import Link from 'next/link';

import { DeleteRecipe } from '@/features/recipe/delete-recipe';
import { publicUrls } from '@/shared/config/url';
import { Drawer, DrawerActionButton, DrawerContent, DrawerTrigger } from '@/shared/ui/drawer';

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
            <Link href={publicUrls.editRecipe(recipeId)}>
              <DrawerActionButton>
                <Pencil className='h-5 w-5 opacity-60' /> Edit Recipe
              </DrawerActionButton>
            </Link>
          </li>

          <li>
            <DeleteRecipe recipeId={recipeId}>
              <DrawerActionButton>
                <Trash2 className='h-5 w-5 opacity-60' /> Delete Recipe
              </DrawerActionButton>
            </DeleteRecipe>
          </li>
        </ul>
      </DrawerContent>
    </Drawer>
  );
}

export { RecipeActionsDrawer };
