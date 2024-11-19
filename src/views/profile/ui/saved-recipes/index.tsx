'use client';

import { RecipeCard, RecipeWithUser } from '@/src/entities/recipe';

import { EmptySavedRecipes } from './empty-saved-recipes';

interface SavedRecipesProps {
  recipes: Array<RecipeWithUser>;
}

function SavedRecipes({ recipes }: SavedRecipesProps) {
  if (recipes.length === 0) return <EmptySavedRecipes />;

  return (
    <div className='grid grid-cols-2 md:grid-cols-3 gap-x-3 gap-y-4'>
      {recipes.map(recipe => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}

export { SavedRecipes };
