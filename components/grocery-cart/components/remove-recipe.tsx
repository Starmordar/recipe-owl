'use client';

import { X } from 'lucide-react';

import { removeRecipeFromCart } from '@/app/(main)/cart/actions';
import { Button } from '@/components/ui/button';
import { useServerAction } from '@/hooks/useServerAction';

interface RemoveRecipeProps {
  recipeId: number;
}

function RemoveRecipe({ recipeId }: RemoveRecipeProps) {
  const [removeRecipeAction, isPending] = useServerAction(removeRecipeFromCart);

  return (
    <Button
      className='px-1'
      variant='ghost'
      size='icon-xs'
      onClick={() => removeRecipeAction(recipeId)}
      loading={isPending}
      loadingText=''
      loadingClassName='h-5 w-5'
    >
      <X className='h-5 w-5' />
    </Button>
  );
}

export default RemoveRecipe;
