'use client';

import { X } from 'lucide-react';

import { removeRecipeFromCart } from '@/app/(main)/cart/actions';
import { Button } from '@/components/ui/button';

interface RemoveRecipeProps {
  recipeId: number;
}

function RemoveRecipe({ recipeId }: RemoveRecipeProps) {
  return (
    <Button
      className='px-1'
      variant='outline'
      size='xss'
      onClick={() => removeRecipeFromCart(recipeId)}
    >
      <X className='h-5 w-5' />
    </Button>
  );
}

export default RemoveRecipe;
