import { notFound } from 'next/navigation';
import React from 'react';

import { getRecipeDetails } from '@/entities/recipe';

import AddToCartAction from './components/add-to-cart-action';
import IngredientsTable from './components/ingredients-table';
import RecipeDescription from './components/recipe-description';
import RecipeImage from './components/recipe-image';
import RecipeMethod from './components/recipe-method';

interface RecipeProps {
  recipeId: number;
}

async function RecipeDetails({ recipeId }: RecipeProps) {
  const recipe = await getRecipeDetails(recipeId);
  if (!recipe) return notFound();

  return (
    <>
      <section className='flex flex-col w-full'>
        <RecipeDescription recipe={recipe} />
        <RecipeImage recipe={recipe} />
      </section>

      <section>
        <div className='flex justify-between mb-2'>
          <h2 className='text-xl font-bold'>Ingredients</h2>
          <AddToCartAction recipe={recipe} />
        </div>
        <IngredientsTable ingredients={recipe.ingredients} />
      </section>

      <section>
        <h2 className='text-xl font-bold mb-2'>Method</h2>
        <RecipeMethod recipe={recipe} />
      </section>
    </>
  );
}

export default RecipeDetails;
