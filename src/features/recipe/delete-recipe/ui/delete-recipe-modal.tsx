'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { deleteRecipe } from '@/src/entities/recipe';
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

import type { PropsWithChildren } from 'react';

interface DeleteRecipeModalProps extends PropsWithChildren {
  recipeId: number;
}

function DeleteRecipeModal({ children, recipeId }: DeleteRecipeModalProps) {
  const t = useTranslations('RecipeDetailsPage.DeleteModal');
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
          <AlertDialogTitle>{t('title')}</AlertDialogTitle>
          <AlertDialogDescription>{t('description')}</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>{t('cancelAction')}</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteRecipe}>{t('submitAction')}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export { DeleteRecipeModal };
