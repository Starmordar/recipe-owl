import CheckedIngredientsList from './components/checked-ingredients/components/ingredients-list';
import EmptyCart from './components/empty-cart';
import RecipeIngredientsList from './components/recipe-section/components/ingredients-list';
import SharedIngredientsList from './components/shared-ingredients/components/ingredients-list';

import type { CartWithRecipes } from '@/lib/data/cart';

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
