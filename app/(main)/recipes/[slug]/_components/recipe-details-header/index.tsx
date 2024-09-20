import { validateRequest } from '@/app/(auth)/actions';
import AppHeader from '@/components/layout/app-header';
import { publicUrls } from '@/config/url';
import { getRecipeDetails, isRecipeSaved } from '@/lib/data/recipe';

import AddToCartAction from './components/add-to-cart-action';
import MoreOptionsAction from './components/more-options-action';
import SaveRecipeAction from './components/save-recipe-action';
import ShareAction from './components/share-action';

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
        <SaveRecipeAction recipeId={recipe.id} userId={user?.id} isSaved={isSaved} />
        <ShareAction />
        <MoreOptionsAction recipeId={recipeId} />
      </div>
    </AppHeader>
  );
}

export default RecipeDetailsHeader;
