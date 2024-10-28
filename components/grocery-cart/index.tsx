import { EmptyCart, type CartWithRecipes } from '@/entities/cart';
import { CheckedIngredientsSection } from '@/widgets/cart-checked-ingredients';
import { CartRecipeSection } from '@/widgets/cart-recipe-section';
import { SharedIngredientsSection } from '@/widgets/cart-shared-ingredients';

interface GroceryCartProps {
  cartWithRecipes: CartWithRecipes;
}

function GroceryCart({ cartWithRecipes }: GroceryCartProps) {
  const { shared, checked, items } = cartWithRecipes;
  if (items.length === 0 && checked.length === 0 && shared.length === 0) return <EmptyCart />;

  return (
    <div className='space-y-4'>
      {cartWithRecipes.items.map(cartItem => (
        <CartRecipeSection key={cartItem.recipe.id} recipeId={cartItem.recipe.id} />
      ))}

      <SharedIngredientsSection />
      <CheckedIngredientsSection />
    </div>
  );
}

export default GroceryCart;
