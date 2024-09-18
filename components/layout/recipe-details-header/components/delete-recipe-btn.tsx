'use client';

import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { PropsWithChildren } from 'react';

import { deleteRecipe } from '@/app/(main)/recipes/actions';
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
} from '@/components/ui/alert-dialog';

interface DeleteRecipeAlertProps extends PropsWithChildren {
  recipeId: number;
}

function DeleteRecipeAlert({ children, recipeId }: DeleteRecipeAlertProps) {
  const router = useRouter();

  async function handleDeleteRecipe() {
    await deleteRecipe(recipeId);
    router.push(`/recipes`);
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger>{children}</AlertDialogTrigger>

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

export default DeleteRecipeAlert;
