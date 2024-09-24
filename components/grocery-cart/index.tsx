import useGroceryCart from '@/hooks/useGroceryCart';

import EmptyCart from './components/empty-cart';
import RecipeCard from './components/recipe-card';
import SharedIngredients from './components/shared-ingredients';

interface GroceryCartProps {
  shareToken: string | undefined;
}

async function GroceryCart({ shareToken }: GroceryCartProps) {
  const { getCart } = useGroceryCart({ shareToken });
  const cart = await getCart();
  if (cart?.items.length === 0) return <EmptyCart />;

  return (
    <div className='flex flex-col'>
      {cart?.items.map(cartItem => <RecipeCard key={cartItem.recipe?.id} cartItem={cartItem} />)}

      <SharedIngredients sharedIngredients={cart?.shared ?? []} />
    </div>
  );
}

export default GroceryCart;
