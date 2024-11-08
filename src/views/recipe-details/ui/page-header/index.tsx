import { EllipsisVertical } from 'lucide-react';

import { getRecipeDetails } from '@/src/entities/recipe';
import { isRecipeSaved, SaveRecipeAction } from '@/src/features/recipe/save-recipe';
import { ShareRecipeAction } from '@/src/features/recipe/share-recipe';
import { validateRequest } from '@/src/shared/api/auth';
import { publicUrls } from '@/src/shared/config/url';
import AppHeader from '@/src/shared/ui/app-header';
import HeaderIconButton from '@/src/shared/ui/app-header-icon-button';
import { RecipeActionsDrawer } from '@/src/widgets/recipe-actions-drawer';

import { AddToCartAction } from './add-to-cart-action';

interface RecipeDetailsHeaderProps {
  recipeId: number;
}

async function RecipeDetailsHeader({ recipeId }: RecipeDetailsHeaderProps) {
  const { user } = await validateRequest();

  const recipe = await getRecipeDetails(recipeId);
  if (!recipe) return null;

  const isSaved = await isRecipeSaved(user?.id, recipeId);

  return (
    <AppHeader prevUrl={publicUrls.recipes} className='pr-3'>
      <div className='flex gap-x-4'>
        <AddToCartAction recipe={recipe} />

        <SaveRecipeAction recipeId={recipe.id} userId={user?.id} isSaved={isSaved} />
        <ShareRecipeAction />

        <RecipeActionsDrawer recipeId={recipeId}>
          <HeaderIconButton Icon={<EllipsisVertical />} />
        </RecipeActionsDrawer>
      </div>
    </AppHeader>
  );
}

export { RecipeDetailsHeader };
