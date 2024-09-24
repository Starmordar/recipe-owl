import EmptyCart from './components/empty-cart';
import RecipeCard from './components/recipe-card';
import SharedIngredients from './components/shared-ingredients';

import type { CartWithRecipes } from '@/lib/data/cart';

interface GroceryCartProps {
  cartWithRecipes: CartWithRecipes;
}

async function GroceryCart({ cartWithRecipes }: GroceryCartProps) {
  if (cartWithRecipes.items.length === 0) return <EmptyCart />;

  return (
    <div>
      {cartWithRecipes.items.map(cartItem => (
        <RecipeCard key={cartItem.recipe.id} cartId={cartWithRecipes.cart.id} cartItem={cartItem} />
      ))}

      <SharedIngredients ingredients={cartWithRecipes.shared} cartId={cartWithRecipes.cart.id} />
    </div>
  );
}

export default GroceryCart;
