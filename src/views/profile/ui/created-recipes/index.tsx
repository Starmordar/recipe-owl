'use client';

import { RecipeCard } from '@/src/entities/recipe';

import { EmptyCreatedRecipes } from './empty-created-recipes';

import type { Recipe } from '@prisma/client';

interface CreatedRecipes {
  recipes: Array<Recipe>;
}

function CreatedRecipes({ recipes }: CreatedRecipes) {
  if (recipes.length === 0) return <EmptyCreatedRecipes />;

  return (
    <div className='grid grid-cols-2 md:grid-cols-3 gap-x-3 gap-y-4'>
      {recipes.map(recipe => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}

export { CreatedRecipes };
