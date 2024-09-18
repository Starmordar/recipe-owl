import { validateRequest } from '@/app/(auth)/actions';
import { publicUrls } from '@/config/url';
import { getRecipeDetails, isRecipeSaved } from '@/lib/data/recipe';

import AppHeader from '../app-header';

import MoreOptionsAction from './components/actions-drawer';
import AddToCartAction from './components/add-to-cart-drawer';
import SaveRecipeAction from './components/save-recipe-btn';
import ShareAction from './components/share-action';

interface RecipeDetailsHeaderProps {
  recipeId: number;
}

async function RecipeDetailsHeader({ recipeId }: RecipeDetailsHeaderProps) {
  const { user } = await validateRequest();

  const recipe = await getRecipeDetails(recipeId);
  if (!recipe) return null;

  const saved = await isRecipeSaved(user?.id, recipeId);

  return (
    <AppHeader prevUrl={publicUrls.recipes} className='pr-2'>
      <div className='flex items-center gap-x-3'>
        <AddToCartAction recipe={recipe} />
        <SaveRecipeAction recipeId={recipe.id} userId={user?.id} isSaved={saved} />
        <ShareAction />
        <MoreOptionsAction recipeId={recipeId} />
      </div>
    </AppHeader>
  );
}

export default RecipeDetailsHeader;
