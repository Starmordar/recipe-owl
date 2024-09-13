import { Pencil } from 'lucide-react';
import Link from 'next/link';

import { validateRequest } from '@/app/(auth)/actions';
import { publicUrls } from '@/config/url';
import { getRecipe, isRecipeSaved } from '@/lib/data/recipe';

import AppHeader from '../app-header';

import DeleteRecipeBtn from './components/delete-recipe-btn';
import SaveRecipeBtn from './components/save-recipe-btn';

interface RecipeDetailsHeaderProps {
  recipeId: number;
}

async function RecipeDetailsHeader({ recipeId }: RecipeDetailsHeaderProps) {
  const { user } = await validateRequest();

  const recipe = await getRecipe(recipeId);
  if (!recipe) return null;

  const saved = await isRecipeSaved(user?.id, recipeId);

  return (
    <AppHeader prevUrl={publicUrls.recipes}>
      {/* <h1 className='text-lg font-semibold leading-none'>{recipe?.title}</h1> */}

      <div className='flex items-center gap-3'>
        <SaveRecipeBtn recipeId={recipe.id} userId={user?.id} isSaved={saved} />

        <Link href={`/recipes/${recipe.id}/edit`}>
          <Pencil className='h-5 w-5 opacity-50' />
        </Link>

        <DeleteRecipeBtn recipeId={recipe.id} />
      </div>
    </AppHeader>
  );
}

export default RecipeDetailsHeader;
