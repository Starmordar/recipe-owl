import { EmptyCart, type CartWithRecipes } from '@/src/entities/cart';
import { CheckedIngredientsSection } from '@/src/widgets/cart-checked-ingredients';
import { CartRecipeSection } from '@/src/widgets/cart-recipe-section';
import { SharedIngredientsSection } from '@/src/widgets/cart-shared-ingredients';

interface RecipesTabProps {
  cartWithRecipes: CartWithRecipes;
}

function RecipesTab({ cartWithRecipes }: RecipesTabProps) {
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

export { RecipesTab };
