import CheckedIngredientsSection from './components/checked-ingredients';
import EmptyCart from './components/empty-cart';
import RecipeSection from './components/recipe-section';
import SharedIngredientsSection from './components/shared-ingredients';

import type { CartWithRecipes } from '@/entities/cart';

interface GroceryCartProps {
  cartWithRecipes: CartWithRecipes;
}

function GroceryCart({ cartWithRecipes }: GroceryCartProps) {
  const { shared, checked, items } = cartWithRecipes;
  if (items.length === 0 && checked.length === 0 && shared.length === 0) return <EmptyCart />;

  return (
    <div className='space-y-4'>
      {cartWithRecipes.items.map(cartItem => (
        <RecipeSection key={cartItem.recipe.id} recipeId={cartItem.recipe.id} />
      ))}

      <SharedIngredientsSection />
      <CheckedIngredientsSection />
    </div>
  );
}

export default GroceryCart;
