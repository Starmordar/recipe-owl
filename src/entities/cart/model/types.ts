import { cartDetailsPayload, cartWithUserPayload } from '../api/payload';

import type { Prisma, Ingredient } from '@prisma/client';

type CartDetails = Prisma.CartGetPayload<typeof cartDetailsPayload>;
type CartWithUser = Prisma.CartGetPayload<typeof cartWithUserPayload>;

interface RecipeItemInCart {
  recipe: Prisma.RecipeGetPayload<{ select: { id: true; title: true; imageUrl: true } }>;
  ingredients: Array<Ingredient & { itemId: number }>;
  quantity: number;
}

interface CartSharedIngredient {
  name: string;

  ingredients: Array<{
    itemId: number;
    id: number;
    recipeId: number;
    recipe: RecipeItemInCart['recipe'];
    unit: string;
    quantity: number;
  }>;
}

interface CartWithRecipes {
  cart: CartDetails;
  checked: CartDetails['items'];
  shared: Array<CartSharedIngredient>;

  items: Array<RecipeItemInCart>;
}

export type { CartDetails, CartWithUser, RecipeItemInCart, CartWithRecipes, CartSharedIngredient };
