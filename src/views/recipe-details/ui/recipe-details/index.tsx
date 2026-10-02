import { getTranslations } from 'next-intl/server';
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
  const t = await getTranslations('RecipeDetailsPage.General');

  return (
    <>
      <RecipeImage recipe={recipe} />

      <div className='container flex flex-col gap-8 pt-4'>
        <RecipeDescription recipe={recipe} />

        <section className='flex flex-col gap-y-3'>
          <h2 className='text-xl font-bold'>{t('ingredientsTitle')}</h2>

          <RecipeIngredientsSection ingredients={recipe.ingredients} />
          <AddToCartAction recipe={recipe} userId={user?.id} />
        </section>

        <section className='flex flex-col gap-y-4'>
          <h2 className='text-xl font-bold'>{t('stepsTitle')}</h2>
          <RecipeMethod recipe={recipe} />
        </section>
      </div>
    </>
  );
}

export { RecipeDetails };
