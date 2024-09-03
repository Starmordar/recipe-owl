'use client';

import { CirclePlus } from 'lucide-react';

import { addRecipeToCart } from '@/app/(main)/cart/actions';
import { Button } from '@/components/ui/button';

interface AddToCartProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  recipe: any;
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
