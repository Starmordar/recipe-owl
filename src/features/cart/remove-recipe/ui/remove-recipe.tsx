'use client';

import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { useCart } from '@/src/entities/cart';
import { useServerAction } from '@/src/shared/lib/use-server-action';
import { Button } from '@/src/shared/ui/button';

import { removeRecipe } from '../model/remove-recipe';

interface RemoveRecipeProps {
  recipeId: number;
}

function RemoveRecipe({ recipeId }: RemoveRecipeProps) {
  const t = useTranslations('CartPage');
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
      loadingClassName='h-6 w-6'
      aria-label={t('removeRecipeLabel')}
    >
      <X className='h-6 w-6' />
    </Button>
  );
}

export { RemoveRecipe };
