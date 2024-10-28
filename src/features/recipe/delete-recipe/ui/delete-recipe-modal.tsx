'use client';

import { useRouter } from 'next/navigation';

import { publicUrls } from '@/src/shared/config/url';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/src/shared/ui/alert-dialog';

import { deleteRecipe } from '../model/delete-recipe';

import type { PropsWithChildren } from 'react';

interface DeleteRecipeProps extends PropsWithChildren {
  recipeId: number;
}

function DeleteRecipe({ children, recipeId }: DeleteRecipeProps) {
  const router = useRouter();

  async function handleDeleteRecipe() {
    await deleteRecipe(recipeId);
    router.push(publicUrls.recipes);
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your recipe.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteRecipe}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export { DeleteRecipe };
