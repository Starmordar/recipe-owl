import useGroceryCart from '@/hooks/useGroceryCart';

import EmptyCart from './components/empty-cart';
import RecipeCard from './components/recipe-card';
import SharedIngredients from './components/shared-ingredients';

interface GroceryCartProps {
  shareToken: string | undefined;
}

async function GroceryCart({ shareToken }: GroceryCartProps) {
  const { getCart } = useGroceryCart({ shareToken });
  const { items, shared } = await getCart();
  if (items.length === 0) return <EmptyCart />;

  return (
    <div className='flex flex-col'>
      {items.map(cartItem => (
        <RecipeCard key={cartItem.recipe?.id} cartItem={cartItem} />
      ))}

      <SharedIngredients sharedIngredients={shared} />
    </div>
  );
}

export default GroceryCart;
