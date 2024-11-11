import React from 'react';

import { validateRequest } from '@/src/shared/api/auth';

import { AddToCartAction } from './add-to-cart-action';
import { RecipeIngredientsSection } from './ingredients-table';
import { RecipeDescription } from './recipe-description';
import { RecipeImage } from './recipe-image';
import { RecipeMethod } from './recipe-method';

import type { RecipeDetails as RecipeDetailsType } from '@/src/entities/recipe';

interface RecipeDetailsProps {
  recipe: RecipeDetailsType;
}

async function RecipeDetails({ recipe }: RecipeDetailsProps) {
  const { user } = await validateRequest();

  return (
    <>
      <section className='flex flex-col gap-y-4'>
        <RecipeDescription recipe={recipe} />
        <RecipeImage recipe={recipe} />
      </section>

      <section>
        <div className='flex justify-between items-center mb-3'>
          <h2 className='text-xl font-bold'>Ingredients</h2>
          <AddToCartAction recipe={recipe} userId={user?.id} />
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
