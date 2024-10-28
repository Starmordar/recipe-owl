'use client';

import { CirclePlus } from 'lucide-react';

import AddToCartDrawer from '@/src/components/recipe-to-cart-drawer';
import HeaderIconButton from '@/src/shared/ui/app-header-icon-button';

import type { RecipeDetails } from '@/src/entities/recipe';

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
