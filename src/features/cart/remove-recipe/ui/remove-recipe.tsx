'use client';

import { X } from 'lucide-react';

import { useCart } from '@/src/entities/cart';
import { useServerAction } from '@/src/shared/lib/use-server-action';
import { Button } from '@/src/shared/ui/button';

import { removeRecipe } from '../model/remove-recipe';

interface RemoveRecipeProps {
  recipeId: number;
}

function RemoveRecipe({ recipeId }: RemoveRecipeProps) {
  const { cartId } = useCart();
  const [removeRecipeAction, isPending] = useServerAction(removeRecipe);

  return (
    <Button
      className='px-1'
      variant='ghost'
      size='icon-xs'
      onClick={() => removeRecipeAction(cartId, recipeId)}
      loading={isPending}
      loadingText=''
      loadingClassName='h-5 w-5'
      aria-label='Remove Recipe from Cart'
    >
      <X className='h-5 w-5' />
    </Button>
  );
}

export { RemoveRecipe };
