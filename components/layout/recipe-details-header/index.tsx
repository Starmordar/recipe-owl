import { validateRequest } from '@/app/(auth)/actions';
import { publicUrls } from '@/config/url';
import { getRecipeDetails, isRecipeSaved } from '@/lib/data/recipe';

import AppHeader from '../app-header';

import ActionsDrawer from './components/actions-drawer';
import SaveRecipeBtn from './components/save-recipe-btn';
import ShareButton from './components/share-action';

interface RecipeDetailsHeaderProps {
  recipeId: number;
}

async function RecipeDetailsHeader({ recipeId }: RecipeDetailsHeaderProps) {
  const { user } = await validateRequest();

  const recipe = await getRecipeDetails(recipeId);
  if (!recipe) return null;

  const saved = await isRecipeSaved(user?.id, recipeId);

  return (
    <AppHeader prevUrl={publicUrls.recipes}>
      {/* <h1 className='text-lg font-semibold leading-none'>{recipe?.title}</h1> */}

      <div className='flex items-center gap-2'>
        <SaveRecipeBtn recipeId={recipe.id} userId={user?.id} isSaved={saved} />
        <ShareButton />

        <ActionsDrawer recipeId={recipeId} />
      </div>
    </AppHeader>
  );
}

export default RecipeDetailsHeader;
