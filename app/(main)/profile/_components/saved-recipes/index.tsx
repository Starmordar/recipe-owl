import { User } from 'lucia';

import RecipePreviewCard from '@/src/components/recipe-preview-cards/components/preview-card';
import { getSavedRecipes } from '@/src/entities/recipe';

import EmptySavedRecipes from './components/empty-saved-recipes';

interface SavedRecipesProps {
  user: User;
}

async function SavedRecipes({ user }: SavedRecipesProps) {
  const recipes = await getSavedRecipes(user.id);
  if (recipes.length === 0) return <EmptySavedRecipes />;

  return (
    <div className='grid grid-cols-2 md:grid-cols-3 gap-x-3 gap-y-4'>
      {recipes.map(recipe => (
        <RecipePreviewCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}

export default SavedRecipes;
