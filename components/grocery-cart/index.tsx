import CheckedIngredientsSection from './components/checked-ingredients';
import EmptyCart from './components/empty-cart';
import RecipeSection from './components/recipe-section';
import SharedIngredientsSection from './components/shared-ingredients';

import type { CartWithRecipes } from '@/lib/data/cart';

interface GroceryCartProps {
  cartWithRecipes: CartWithRecipes;
}

function GroceryCart({ cartWithRecipes }: GroceryCartProps) {
  if (cartWithRecipes.items.length === 0) return <EmptyCart />;

  return (
    <div>
      {cartWithRecipes.items.map(cartItem => (
        <RecipeSection key={cartItem.recipe.id} recipeId={cartItem.recipe.id} />
      ))}

      <SharedIngredientsSection />
      <CheckedIngredientsSection />
    </div>
  );
}

export default GroceryCart;
