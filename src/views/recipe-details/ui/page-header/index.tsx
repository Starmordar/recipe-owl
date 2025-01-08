import { EllipsisVertical } from 'lucide-react';

import { isRecipeSaved, SaveRecipeAction } from '@/src/features/recipe/save-recipe';
import { ShareRecipeAction } from '@/src/features/recipe/share-recipe';
import { validateRequest } from '@/src/shared/api/auth';
import { publicUrls } from '@/src/shared/config/url';
import AppHeader from '@/src/shared/ui/app-header';
import HeaderIconButton from '@/src/shared/ui/app-header-icon-button';
import { RecipeActionsDrawer } from '@/src/widgets/recipe-actions-drawer';

import { AddToCartAction } from './add-to-cart-action';

import type { RecipeDetails } from '@/src/entities/recipe';

interface RecipeDetailsHeaderProps {
  recipe: RecipeDetails;
}

async function RecipeDetailsHeader({ recipe }: RecipeDetailsHeaderProps) {
  const { user } = await validateRequest();

  const isSaved = await isRecipeSaved(user?.id, recipe.id);
  const isCurrentUserOwner = user && user.id === recipe.user.id;

  return (
    <AppHeader prevUrl={publicUrls.recipes} className='pr-3'>
      <div className='flex gap-x-4'>
        <AddToCartAction recipe={recipe} />

        <SaveRecipeAction recipeId={recipe.id} isSaved={isSaved} />
        <ShareRecipeAction />

        {isCurrentUserOwner && (
          <RecipeActionsDrawer recipeId={recipe.id}>
            <HeaderIconButton Icon={<EllipsisVertical />} />
          </RecipeActionsDrawer>
        )}
      </div>
    </AppHeader>
  );
}

export { RecipeDetailsHeader };
