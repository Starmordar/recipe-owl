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
      <Button className='gap-2' variant='outline' size='xss'>
        Add to Cart <CirclePlus className='h-4 w-4' />
      </Button>
    </AddRecipeToCartDrawer>
  );
}

export { AddToCartAction };
