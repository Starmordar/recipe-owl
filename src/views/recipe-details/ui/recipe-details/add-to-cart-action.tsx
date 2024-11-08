'use client';

import { CirclePlus } from 'lucide-react';

import { Button } from '@/src/shared/ui/button';
import { AddRecipeToCartDrawer } from '@/src/widgets/recipe-to-cart-drawer';

import type { RecipeDetails } from '@/src/entities/recipe';

interface AddToCartActionProps {
  recipe: RecipeDetails;
}

function AddToCartAction({ recipe }: AddToCartActionProps) {
  return (
    <AddRecipeToCartDrawer recipe={recipe}>
      <Button className='gap-x-3 text-base' variant='outline' size='xs'>
        Add to Cart <CirclePlus className='h-6 w-6' />
      </Button>
    </AddRecipeToCartDrawer>
  );
}

export { AddToCartAction };
