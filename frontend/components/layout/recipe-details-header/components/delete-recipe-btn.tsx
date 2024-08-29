'use client';

import { Trash2 } from 'lucide-react';

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
import { deleteRecipe } from '@/lib/data';

interface DeleteRecipeBtnProps {
  recipeId: number;
}

function DeleteRecipeBtn({ recipeId }: DeleteRecipeBtnProps) {
  async function handleDeleteRecipe() {
    await deleteRecipe(recipeId);
    console.log('delete recipe');
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Trash2 className='h-4 w-4 opacity-50' />
      </AlertDialogTrigger>

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

export default DeleteRecipeBtn;
