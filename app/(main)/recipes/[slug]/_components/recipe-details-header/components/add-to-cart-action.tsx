'use client';

import { CirclePlus } from 'lucide-react';

import HeaderIconButton from '@/components/layout/app-header/components/icon-button';
import AddToCartDrawer from '@/components/recipe-to-cart-drawer';

import type { RecipeDetails } from '@/types/api';

interface AddToCartActionProps {
  recipe: RecipeDetails;
}

function AddToCartAction({ recipe }: AddToCartActionProps) {
  return (
    <AddToCartDrawer recipe={recipe}>
      <HeaderIconButton Icon={<CirclePlus />} />
    </AddToCartDrawer>
  );
}

export default AddToCartAction;
