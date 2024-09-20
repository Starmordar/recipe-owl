'use client';

import { CirclePlus } from 'lucide-react';

import AddToCartDrawer from '@/components/recipe-to-cart-drawer';
import { Button } from '@/components/ui/button';

import type { RecipeDetails } from '@/types/api';

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
