import { prisma } from '@/src/shared/api';

import { cartDetailsPayload } from './payload';

import type { CartDetails } from '../model/types';
import type { Prisma } from '@prisma/client';

async function getCartDetails(where: Prisma.CartWhereInput): Promise<CartDetails | null> {
  return prisma.cart.findFirst({ where, ...cartDetailsPayload });
}

export { getCartDetails };
