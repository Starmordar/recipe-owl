import { notFound } from 'next/navigation';
import React from 'react';

import { getRecipeDetails } from '@/src/entities/recipe';

import { AddToCartAction } from './add-to-cart-action';
import { RecipeIngredientsSection } from './ingredients-table';
import { RecipeDescription } from './recipe-description';
import { RecipeImage } from './recipe-image';
import { RecipeMethod } from './recipe-method';

interface RecipeProps {
  recipeId: number;
}

async function RecipeDetails({ recipeId }: RecipeProps) {
  const recipe = await getRecipeDetails(recipeId);
  if (!recipe) return notFound();

  return (
    <>
      <section className='flex flex-col gap-y-4'>
        <RecipeDescription recipe={recipe} />
        <RecipeImage recipe={recipe} />
      </section>

      <section>
        <div className='flex justify-between items-center mb-3'>
          <h2 className='text-xl font-bold'>Ingredients</h2>
          <AddToCartAction recipe={recipe} />
        </div>

        <RecipeIngredientsSection ingredients={recipe.ingredients} />
      </section>

      <section>
        <h2 className='text-xl font-bold mb-3'>Method</h2>
        <RecipeMethod recipe={recipe} />
      </section>
    </>
  );
}

export { RecipeDetails };
