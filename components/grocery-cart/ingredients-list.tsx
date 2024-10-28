import { EmptyCart, type CartWithRecipes } from '@/entities/cart';
import { CheckedIngredientsList } from '@/widgets/cart-checked-ingredients';
import { RecipeIngredientsList } from '@/widgets/cart-recipe-section';
import { SharedIngredientsList } from '@/widgets/cart-shared-ingredients';

interface IngredientsListProps {
  cartWithRecipes: CartWithRecipes;
}

function IngredientsList({ cartWithRecipes }: IngredientsListProps) {
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

export default IngredientsList;
