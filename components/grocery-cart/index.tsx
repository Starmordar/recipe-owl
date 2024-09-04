import { getCart } from '@/lib/data/cart';

import RecipeCard from './components/recipe-card';

async function GroceryCart() {
  const cart = await getCart();
  console.log('cart :>> ', cart);
  if (!cart) return null;

  return (
    <div className='flex flex-col gap-4'>
      {cart.map(cartItem => (
        <RecipeCard key={cartItem.recipe?.id} cartItem={cartItem} />
      ))}
    </div>
  );
}

export default GroceryCart;
