import { CirclePlus } from 'lucide-react';

import { ProtectedDrawer } from '@/src/entities/session/server';
import HeaderIconButton from '@/src/shared/ui/app-header-icon-button';
import { AddRecipeToCartDrawer } from '@/src/widgets/recipe-to-cart-drawer';

import type { RecipeDetails } from '@/src/entities/recipe';

interface AddToCartActionProps {
  recipe: RecipeDetails;
}

function AddToCartAction({ recipe }: AddToCartActionProps) {
  return (
    <ProtectedDrawer
      title='Log In to Add Recipe to Cart'
      description='To add recipe to your cart, please log in or create a new account.'
      renderTrigger={() => <HeaderIconButton Icon={<CirclePlus />} />}
    >
      <AddRecipeToCartDrawer recipe={recipe}>
        <HeaderIconButton Icon={<CirclePlus />} />
      </AddRecipeToCartDrawer>
    </ProtectedDrawer>
  );
}

export { AddToCartAction };
