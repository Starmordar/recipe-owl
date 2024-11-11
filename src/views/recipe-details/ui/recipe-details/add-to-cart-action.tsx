'use client';

import { CirclePlus } from 'lucide-react';

import { RequireAuthDrawer } from '@/src/entities/session';
import { Button } from '@/src/shared/ui/button';
import { AddRecipeToCartDrawer } from '@/src/widgets/recipe-to-cart-drawer';

import type { RecipeDetails } from '@/src/entities/recipe';

interface AddToCartActionProps {
  recipe: RecipeDetails;
  userId: string | undefined;
}

function AddToCartAction({ recipe, userId }: AddToCartActionProps) {
  if (!userId) {
    return (
      <RequireAuthDrawer
        title='Log In to Add Recipe to Cart'
        description='To add recipe to your cart, please log in or create a new account.'
      >
        <Button className='gap-x-3 text-base' variant='outline' size='xs'>
          Add to Cart <CirclePlus className='h-5 w-5' />
        </Button>
      </RequireAuthDrawer>
    );
  }

  return (
    <AddRecipeToCartDrawer recipe={recipe}>
      <Button className='gap-x-3 text-base' variant='outline' size='xs'>
        Add to Cart <CirclePlus className='h-5 w-5' />
      </Button>
    </AddRecipeToCartDrawer>
  );
}

export { AddToCartAction };
