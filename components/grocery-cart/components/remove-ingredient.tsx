'use client';

import { Trash2 } from 'lucide-react';

import { removeIngredientFromCart } from '@/app/(main)/cart/actions';
import { Button } from '@/components/ui/button';

interface RemoveIngredientProps {
  recipeId: number;
  ingredientId: number;
}

function RemoveIngredient({ recipeId, ingredientId }: RemoveIngredientProps) {
  return (
    <Button
      className='px-1'
      variant='outline'
      size='xss'
      onClick={() => removeIngredientFromCart(recipeId, ingredientId)}
    >
      <Trash2 className='h-5 w-5' />
    </Button>
  );
}

export default RemoveIngredient;
