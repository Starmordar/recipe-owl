import { getTranslations } from 'next-intl/server';
import React from 'react';

import { isRecipeSaved, SaveRecipeButton } from '@/src/features/recipe/save-recipe';
import { ShareRecipeButton } from '@/src/features/recipe/share-recipe';
import { validateRequest } from '@/src/shared/api/auth';

import { ScrollMarker } from '../scroll-marker-provider';

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

  const isSaved = await isRecipeSaved(user?.id, recipe.id);

  return (
    <>
      <RecipeImage recipe={recipe} />

      <div className='relative -mt-5 rounded-t-2xl bg-background md:mt-0 md:rounded-none'>
        <ScrollMarker name='photo' className='top-4' />

        <div className='container flex flex-col gap-8 pt-5 md:pt-4'>
          <RecipeDescription recipe={recipe} />

          <section className='flex flex-col gap-y-3'>
            <h2 className='text-xl font-bold'>{t('ingredientsTitle')}</h2>

            <RecipeIngredientsSection ingredients={recipe.ingredients} />
            <AddToCartAction recipe={recipe} userId={user?.id} />
          </section>

          <section className='flex flex-col gap-y-2'>
            <h2 className='text-xl font-bold'>{t('stepsTitle')}</h2>
            <RecipeMethod recipe={recipe} />

            <div className='grid grid-cols-2 gap-2'>
              <SaveRecipeButton recipeId={recipe.id} isSaved={isSaved} />
              <ShareRecipeButton recipeId={recipe.id} />
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export { RecipeDetails };
