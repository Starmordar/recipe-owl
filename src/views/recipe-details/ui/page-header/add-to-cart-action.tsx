'use client';

import { CirclePlus } from 'lucide-react';

import { RequireAuthDrawer } from '@/src/entities/session';
import HeaderIconButton from '@/src/shared/ui/app-header-icon-button';
import { AddRecipeToCartDrawer } from '@/src/widgets/recipe-to-cart-drawer';

import type { RecipeDetails } from '@/src/entities/recipe';

interface AddToCartActionProps {
  userId: string | undefined;
  recipe: RecipeDetails;
}

function AddToCartAction({ userId, recipe }: AddToCartActionProps) {
  if (!userId) {
    return (
      <RequireAuthDrawer
        title='Log In to Add Recipe to Cart'
        description='To add recipe to your cart, please log in or create a new account.'
      >
        <HeaderIconButton Icon={<CirclePlus />} />
      </RequireAuthDrawer>
    );
  }

  return (
    <AddRecipeToCartDrawer recipe={recipe}>
      <HeaderIconButton Icon={<CirclePlus />} />
    </AddRecipeToCartDrawer>
  );
}

export { AddToCartAction };
