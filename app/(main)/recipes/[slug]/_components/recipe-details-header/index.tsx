import { EllipsisVertical } from 'lucide-react';

import { getRecipeDetails, isRecipeSaved } from '@/entities/recipe';
import { validateRequest } from '@/entities/session';
import { SaveRecipe } from '@/features/recipe/save-recipe';
import { ShareRecipe } from '@/features/recipe/share-recipe';
import { publicUrls } from '@/shared/config/url';
import AppHeader from '@/shared/ui/app-header';
import HeaderIconButton from '@/shared/ui/app-header-icon-button';
import { RecipeActionsDrawer } from '@/widgets/recipe-actions-drawer';

import AddToCartAction from './components/add-to-cart-action';

interface RecipeDetailsHeaderProps {
  recipeId: number;
}

async function RecipeDetailsHeader({ recipeId }: RecipeDetailsHeaderProps) {
  const { user } = await validateRequest();

  const recipe = await getRecipeDetails(recipeId);
  if (!recipe) return null;

  const isSaved = await isRecipeSaved(user?.id, recipeId);

  return (
    <AppHeader prevUrl={publicUrls.recipes} className='pr-2'>
      <div className='flex items-center gap-x-3'>
        <AddToCartAction recipe={recipe} />

        <SaveRecipe recipeId={recipe.id} userId={user?.id} isSaved={isSaved} />
        <ShareRecipe />

        <RecipeActionsDrawer recipeId={recipeId}>
          <HeaderIconButton Icon={<EllipsisVertical />} />
        </RecipeActionsDrawer>
      </div>
    </AppHeader>
  );
}

export default RecipeDetailsHeader;
