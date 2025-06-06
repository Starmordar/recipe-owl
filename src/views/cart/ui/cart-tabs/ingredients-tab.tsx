import { EmptyCart, type CartWithRecipes } from '@/src/entities/cart';
import { CheckedIngredientsList } from '@/src/widgets/cart-checked-ingredients';
import { RecipeIngredientsList } from '@/src/widgets/cart-recipe-section';
import { SharedIngredientsList } from '@/src/widgets/cart-shared-ingredients';

interface CartIngredientsTabProps {
  cartWithRecipes: CartWithRecipes;
}

function CartIngredientsTab({ cartWithRecipes }: CartIngredientsTabProps) {
  const { shared, checked, items } = cartWithRecipes;
  if (items.length === 0 && checked.length === 0 && shared.length === 0) return <EmptyCart />;

  return (
    <div className=''>
      {cartWithRecipes.items.map(cartItem => (
        <RecipeIngredientsList key={cartItem.recipe.id} recipeId={cartItem.recipe.id} />
      ))}

      <SharedIngredientsList />
      <CheckedIngredientsList />
    </div>
  );
}

export { CartIngredientsTab };
