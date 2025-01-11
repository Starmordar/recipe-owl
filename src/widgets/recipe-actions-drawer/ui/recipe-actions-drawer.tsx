'use client';

import { Pencil, Trash2 } from 'lucide-react';

import { useTranslations } from 'next-intl';
 
import { DeleteRecipeModal } from '@/src/features/recipe/delete-recipe';
import { publicUrls } from '@/src/shared/config/url';
import { Link } from '@/src/shared/i18n/routing';
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
  const t = useTranslations('RecipeDetailsPage.ActionDrawer');

  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>

      <DrawerContent>
        <DrawerHeader className='sr-only'>
          <DrawerTitle>{t('title')}</DrawerTitle>
          <DrawerDescription>{t('description')}</DrawerDescription>
        </DrawerHeader>

        <ul className='my-4'>
          <li>
            <Link href={publicUrls.editRecipe(recipeId)} replace>
              <DrawerActionButton>
                <Pencil className='h-5 w-5 opacity-60' /> {t('editAction')}
              </DrawerActionButton>
            </Link>
          </li>

          <li>
            <DeleteRecipeModal recipeId={recipeId}>
              <DrawerActionButton>
                <Trash2 className='h-5 w-5 opacity-60' /> {t('deleteAction')}
              </DrawerActionButton>
            </DeleteRecipeModal>
          </li>
        </ul>
      </DrawerContent>
    </Drawer>
  );
}

export { RecipeActionsDrawer };
