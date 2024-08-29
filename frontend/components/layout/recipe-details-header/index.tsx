import { Pencil } from 'lucide-react';
import Link from 'next/link';

import { publicUrls } from '@/config/url';
import { getRecipe } from '@/lib/data';

import AppHeader from '../app-header';

import DeleteRecipeBtn from './components/delete-recipe-btn';

interface RecipeDetailsHeaderProps {
  recipeId: number;
}

async function RecipeDetailsHeader({ recipeId }: RecipeDetailsHeaderProps) {
  const recipe = await getRecipe(recipeId);
  if (!recipe) return null;

  return (
    <AppHeader prevUrl={publicUrls.recipes}>
      {/* <h1 className='text-lg font-semibold leading-none'>{recipe?.title}</h1> */}

      <div className='flex items-center gap-3'>
        <DeleteRecipeBtn recipeId={recipe.id} />

        <Link href={`/recipes/${recipe.id}/edit`}>
          <Pencil className='h-4 w-4 opacity-50' />
        </Link>
      </div>
    </AppHeader>
  );
}

export default RecipeDetailsHeader;
