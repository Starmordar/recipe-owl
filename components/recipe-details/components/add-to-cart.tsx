'use client';

import { CirclePlus } from 'lucide-react';

import { addRecipeToCart } from '@/app/(main)/cart/actions';
import { Button } from '@/components/ui/button';

import type { RecipeDetails } from '@/types/api';

interface AddToCartProps {
  recipe: RecipeDetails;
}

function AddToCart({ recipe }: AddToCartProps) {
  return (
    <Button
      className='gap-2'
      variant='outline'
      size='xss'
      onClick={() => addRecipeToCart(recipe.id, recipe.ingredients)}
    >
      Add to Cart <CirclePlus className='h-4 w-4' />
    </Button>
  );
}

export default AddToCart;
