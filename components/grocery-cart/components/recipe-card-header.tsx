import Image from 'next/image';

import { CardTitle } from '@/components/ui/card';

import RemoveRecipe from './remove-recipe';

import type { CartRecipe } from '@/lib/data/cart';

interface RecipeCardHeaderProps {
  recipe: NonNullable<CartRecipe['recipe']>;
}

function RecipeCardHeader({ recipe }: RecipeCardHeaderProps) {
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

      <div className='flex w-full justify-between'>
        <CardTitle className='text-lg'>{recipe.title}</CardTitle>
        <RemoveRecipe recipeId={recipe.id} />
      </div>
    </>
  );
}

export default RecipeCardHeader;
