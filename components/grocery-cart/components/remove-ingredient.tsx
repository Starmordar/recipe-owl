'use client';

import { X } from 'lucide-react';

import { removeIngredientFromCart } from '@/app/(main)/cart/actions';
import { Button } from '@/components/ui/button';
import { useServerAction } from '@/hooks/useServerAction';

interface RemoveIngredientProps {
  cartId: number;
  recipeIds: Array<number>;
  ingredientIds: Array<number>;
}

function RemoveIngredient({ cartId, recipeIds, ingredientIds }: RemoveIngredientProps) {
  const [removeIngredientAction, isPending] = useServerAction(removeIngredientFromCart);

  return (
    <Button
      className='px-1'
      variant='ghost'
      size='icon-xs'
      onClick={() => removeIngredientAction(cartId, recipeIds, ingredientIds)}
      loading={isPending}
      loadingText=''
      loadingClassName='h-5 w-5'
    >
      <X className='h-5 w-5' />
    </Button>
  );
}

export default RemoveIngredient;
