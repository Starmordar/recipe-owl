import { getCart } from '@/lib/data/cart';

import EmptyCart from './components/empty-cart';
import RecipeCard from './components/recipe-card';

async function GroceryCart() {
  const cart = await getCart();
  if (cart.length === 0) return <EmptyCart />;

  return (
    <div className='flex flex-col'>
      {cart.map(cartItem => (
        <RecipeCard key={cartItem.recipe?.id} cartItem={cartItem} />
      ))}
    </div>
  );
}

export default GroceryCart;
