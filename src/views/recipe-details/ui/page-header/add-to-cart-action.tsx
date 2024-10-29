'use client';

import { CirclePlus } from 'lucide-react';

import HeaderIconButton from '@/src/shared/ui/app-header-icon-button';
import { AddRecipeToCartDrawer } from '@/src/widgets/recipe-to-cart-drawer';

import type { RecipeDetails } from '@/src/entities/recipe';

interface AddToCartActionProps {
  recipe: RecipeDetails;
}

function AddToCartAction({ recipe }: AddToCartActionProps) {
  return (
    <AddRecipeToCartDrawer recipe={recipe}>
      <HeaderIconButton Icon={<CirclePlus />} />
    </AddRecipeToCartDrawer>
  );
}

export { AddToCartAction };
