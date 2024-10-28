'use client';

import { useCart } from '@/entities/cart';
import { Card } from '@/shared/ui/card';
import { CartRecipeHeader } from '@/widgets/cart-recipe-header';

import { RecipeIngredientsList } from './ingredients-list';

interface CartRecipeSectionProps {
  recipeId: number;
}

function CartRecipeSection({ recipeId }: CartRecipeSectionProps) {
  const { cartDetails } = useCart();
  const { items } = cartDetails;

  const cartItem = items.find(item => item.recipe.id === recipeId);
  if (!cartItem) return null;

  return (
    <Card className='flex flex-col p-4'>
      <div className='flex flex-row space-y-0 gap-4'>
        <CartRecipeHeader recipe={cartItem.recipe} quantity={cartItem.quantity} />
      </div>

      <RecipeIngredientsList recipeId={recipeId} />
    </Card>
  );
}

export { CartRecipeSection };
