import Image from 'next/image';

import { CardTitle } from '@/components/ui/card';
import { NumberInputSpinner } from '@/components/ui/number-input-spinner';

import RemoveRecipe from './remove-recipe';
import ServingInput from './servings-input';

import type { CartRecipe } from '@/lib/data/cart';

interface RecipeCardHeaderProps {
  recipe: NonNullable<CartRecipe['recipe']>;
  quantity: number;
}

function RecipeCardHeader({ recipe, quantity }: RecipeCardHeaderProps) {
  return (
    <>
      <div className='relative min-w-[20vw] w-[20vw] h-[20vw]'>
        <Image
          className='rounded-lg'
          src={recipe.imageUrl}
          alt={`${recipe.title} recipe image`}
          fill
          sizes='20vw'
          style={{ objectFit: 'cover' }}
        />
      </div>

      <div className='flex flex-col justify-between w-full min-w-0'>
        <div className='flex justify-between w-full min-w-0'>
          <CardTitle className='line-clamp-3 text-lg'>{recipe.title}</CardTitle>
          <RemoveRecipe recipeId={recipe.id} />
        </div>

        <ServingInput recipeId={recipe.id} quantity={quantity} />
      </div>
    </>
  );
}

export default RecipeCardHeader;
