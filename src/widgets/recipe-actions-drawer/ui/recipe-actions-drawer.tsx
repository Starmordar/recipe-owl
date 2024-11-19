'use client';

import { Pencil, Trash2 } from 'lucide-react';
import Link from 'next/link';

import { DeleteRecipeModal } from '@/src/features/recipe/delete-recipe';
import { publicUrls } from '@/src/shared/config/url';
import {
  Drawer,
  DrawerActionButton,
  DrawerContent,
  DrawerTrigger,
  DrawerTitle,
  DrawerHeader,
  DrawerDescription,
} from '@/src/shared/ui/drawer';

import type { PropsWithChildren } from 'react';

interface RecipeActionsDrawerProps extends PropsWithChildren {
  recipeId: number;
}

function RecipeActionsDrawer({ children, recipeId }: RecipeActionsDrawerProps) {
  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>

      <DrawerContent>
        <DrawerHeader className='sr-only'>
          <DrawerTitle>Action Buttons</DrawerTitle>
          <DrawerDescription>Drawer for recipe management</DrawerDescription>
        </DrawerHeader>

        <ul className='my-4'>
          <li>
            <Link href={publicUrls.editRecipe(recipeId)} replace>
              <DrawerActionButton>
                <Pencil className='h-5 w-5 opacity-60' /> Edit Recipe
              </DrawerActionButton>
            </Link>
          </li>

          <li>
            <DeleteRecipeModal recipeId={recipeId}>
              <DrawerActionButton>
                <Trash2 className='h-5 w-5 opacity-60' /> Delete Recipe
              </DrawerActionButton>
            </DeleteRecipeModal>
          </li>
        </ul>
      </DrawerContent>
    </Drawer>
  );
}

export { RecipeActionsDrawer };
