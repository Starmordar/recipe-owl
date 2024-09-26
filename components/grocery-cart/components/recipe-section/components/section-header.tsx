import Image from 'next/image';

import { CardTitle } from '@/components/ui/card';

import RemoveRecipe from './remove-recipe';
import ServingInput from './servings-input';

import type { CartRecipe } from '@/lib/data/cart';

interface SectionHeaderProps {
  recipe: NonNullable<CartRecipe['recipe']>;
  quantity: number;
}

function SectionHeader({ recipe, quantity }: SectionHeaderProps) {
  return (
    <>
      <div className='relative min-w-15 w-15 h-15'>
        <Image
          className='rounded-lg'
          src={recipe.imageUrl}
          alt={`${recipe.title} recipe image`}
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

        <ServingInput recipeId={recipe.id} quantity={quantity} />
      </div>
    </>
  );
}

export default SectionHeader;
