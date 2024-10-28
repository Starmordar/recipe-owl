import { prisma } from '@/shared/api/prisma-client';

import { cartDetailsPayload } from './payload';

import type { CartDetails } from './type';
import type { Prisma } from '@prisma/client';

async function getCartDetails(where: Prisma.CartWhereInput): Promise<CartDetails | null> {
  return prisma.cart.findFirst({ where, ...cartDetailsPayload });
}

export { getCartDetails };
