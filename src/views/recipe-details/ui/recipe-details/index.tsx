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

      <section className='flex flex-col gap-y-3'>
        <div className='flex justify-between items-center'>
          <h2 className='text-xl font-bold'>Ingredients</h2>
          <AddToCartAction recipe={recipe} userId={user?.id} />
        </div>

        <RecipeIngredientsSection ingredients={recipe.ingredients} />
      </section>

      <section className='flex flex-col gap-y-3'>
        <h2 className='text-xl font-bold'>Method</h2>
        <RecipeMethod recipe={recipe} />
      </section>
    </>
  );
}

export { RecipeDetails };
