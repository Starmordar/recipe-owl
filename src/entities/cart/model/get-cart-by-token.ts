import { getCartDetails } from './get-cart-details';
import { populateCartWithItems } from './populate-cart-with-items';

import type { CartWithRecipes } from './type';

async function getCartByShareToken(shareToken: string): Promise<CartWithRecipes | null> {
  const cartDetails = await getCartDetails({ shareToken });
  if (cartDetails === null) return null;

  return populateCartWithItems(cartDetails);
}

export { getCartByShareToken };
