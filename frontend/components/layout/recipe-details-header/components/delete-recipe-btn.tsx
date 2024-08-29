'use client';

import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { deleteRecipe } from '@/app/recipes/actions';
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

interface DeleteRecipeBtnProps {
  recipeId: number;
}

function DeleteRecipeBtn({ recipeId }: DeleteRecipeBtnProps) {
  const router = useRouter();

  async function handleDeleteRecipe() {
    await deleteRecipe(recipeId);
    router.push(`/recipes`);
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
