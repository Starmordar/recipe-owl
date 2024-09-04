'use client';

import { CirclePlus } from 'lucide-react';

import { addRecipeToCart } from '@/app/(main)/cart/actions';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useServerAction } from '@/hooks/useServerAction';

import type { RecipeDetails } from '@/types/api';

interface AddToCartProps {
  recipe: RecipeDetails;
}

function AddToCart({ recipe }: AddToCartProps) {
  const { toast } = useToast();
  const [addRecipeAction, isPending] = useServerAction(addRecipeToCart);

  async function handleAddToCart() {
    await addRecipeAction(recipe.id, recipe.ingredients)
      .then(() => toast({ title: 'Recipe successfully added to your cart!' }))
      .catch(() =>
        toast({ title: 'This recipe is already in your cart.', variant: 'destructive' }),
      );
  }

  return (
    <Button
      className='gap-2'
      variant='outline'
      size='xss'
      onClick={handleAddToCart}
      loading={isPending}
      loadingText='Adding...'
    >
      Add to Cart <CirclePlus className='h-4 w-4' />
    </Button>
  );
}

export default AddToCart;
