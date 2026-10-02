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
      {/* From `lg` up the photo sits beside the description instead of above it. */}
      <div className='lg:mx-auto lg:grid lg:w-full lg:max-w-6xl lg:grid-cols-2 lg:items-center lg:gap-x-10 lg:px-8 lg:pt-8'>
        <RecipeImage recipe={recipe} />

        <div className='relative -mt-5 rounded-t-2xl bg-background pt-5 max-lg:container md:mt-0 md:rounded-none md:pt-4 lg:pt-0'>
          <ScrollMarker name='photo' className='top-4' />
          <RecipeDescription recipe={recipe} />
        </div>
      </div>

      {/* From `lg` up the ingredients stay pinned beside the method while it scrolls. */}
      <div className='container flex flex-col gap-8 pt-8 lg:grid lg:max-w-6xl lg:grid-cols-[minmax(0,5fr)_minmax(0,8fr)] lg:items-start lg:gap-x-12 lg:px-8 lg:pt-12'>
        <section className='flex flex-col gap-y-3 lg:sticky lg:top-20 lg:max-h-[calc(100dvh-6.5rem)] lg:rounded-2xl lg:border lg:p-6'>
          <h2 className='text-xl font-bold lg:text-2xl'>{t('ingredientsTitle')}</h2>

          <RecipeIngredientsSection ingredients={recipe.ingredients} />
          <AddToCartAction recipe={recipe} userId={user?.id} />
        </section>

        <section className='flex flex-col gap-y-2'>
          <h2 className='text-xl font-bold lg:text-2xl'>{t('stepsTitle')}</h2>
          <RecipeMethod recipe={recipe} />

          <div className='grid grid-cols-2 gap-2 lg:flex lg:[&_button]:w-auto lg:[&_button]:px-5'>
            <SaveRecipeButton recipeId={recipe.id} isSaved={isSaved} />
            <ShareRecipeButton recipeId={recipe.id} />
          </div>
        </section>
      </div>
    </>
  );
}

export { RecipeDetails };
