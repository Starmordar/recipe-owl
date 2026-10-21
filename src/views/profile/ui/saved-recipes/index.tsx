'use client';

import { RecipeCard, RecipeWithUser } from '@/src/entities/recipe';

import { EmptySavedRecipes } from './empty-saved-recipes';

interface SavedRecipesProps {
  recipes: Array<RecipeWithUser>;
}

function SavedRecipes({ recipes }: SavedRecipesProps) {
  if (recipes.length === 0) return <EmptySavedRecipes />;

  return (
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 md:gap-x-4 gap-y-5'>
      {recipes.map(recipe => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          className='aspect-[4/3]'
          imageSizes='(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 270px'
        />
      ))}
    </div>
  );
}

export { SavedRecipes };
