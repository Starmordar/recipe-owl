import Image from 'next/image';
import React from 'react';

import { RemoveRecipe } from '@/src/features/cart/remove-recipe';
import { ServingsInput } from '@/src/features/cart/update-servings';
import { CardTitle } from '@/src/shared/ui/card';

import type { RecipeItemInCart } from '@/src/entities/cart';

interface RecipeHeaderProps {
  recipe: NonNullable<RecipeItemInCart['recipe']>;
  quantity: number;
}

function RecipeHeader({ recipe, quantity }: RecipeHeaderProps) {
  return (
    <>
      <div className='relative min-w-15 w-15 h-15'>
        <Image
          className='rounded-lg'
          src={recipe.imageUrl}
          alt={`${recipe.title}`}
          fill
          sizes='10vw'
          style={{ objectFit: 'cover' }}
        />
      </div>

      <div className='flex flex-col justify-between w-full min-w-0 gap-y-0'>
        <div className='flex justify-between items-center w-full min-w-0'>
          <CardTitle className='line-clamp-1 text-base mr-2'>{recipe.title}</CardTitle>
          <RemoveRecipe recipeId={recipe.id} />
        </div>

        <ServingsInput recipeId={recipe.id} quantity={quantity} />
      </div>
    </>
  );
}

export { RecipeHeader };
