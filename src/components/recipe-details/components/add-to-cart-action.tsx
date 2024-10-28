'use client';

import { CirclePlus } from 'lucide-react';

import AddToCartDrawer from '@/src/components/recipe-to-cart-drawer';
import { Button } from '@/src/shared/ui/button';

import type { RecipeDetails } from '@/src/entities/recipe';

interface AddToCartActionProps {
  recipe: RecipeDetails;
}

function AddToCartAction({ recipe }: AddToCartActionProps) {
  return (
    <AddToCartDrawer recipe={recipe}>
      <Button className='gap-2' variant='outline' size='xss'>
        Add to Cart <CirclePlus className='h-4 w-4' />
      </Button>
    </AddToCartDrawer>
  );
}

export default AddToCartAction;
