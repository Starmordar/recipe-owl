import { prisma } from '@/src/shared/api';

import { getCartDetails } from './get-cart-details';
import { cartDetailsPayload } from './payload';
import { populateCartWithItems } from './populate-cart-with-items';

import type { CartWithRecipes } from '../model/types';

async function getOrCreateCart(userId: string): Promise<CartWithRecipes> {
  const cartDetails = await getCartDetails({ userId });
  if (cartDetails !== null) return populateCartWithItems(cartDetails);

  const createdCart = await prisma.cart.create({ data: { userId }, ...cartDetailsPayload });
  return populateCartWithItems(createdCart);
}

export { getOrCreateCart };
