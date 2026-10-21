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

export { CreatedRecipes };
