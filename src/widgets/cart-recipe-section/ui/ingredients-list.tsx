'use client';

import React from 'react';

import {
  useCart,
  applyQuantityToUnit,
  CartIngredientsSection,
  updateCartItemCheckStatus,
} from '@/src/entities/cart';
import { RemoveIngredient } from '@/src/features/cart/remove-ingredient';

import type { RecipeItemInCart } from '@/src/entities/cart';

type Ingredient = RecipeItemInCart['ingredients'][number];

interface RecipeIngredientsListProps {
  recipeId: number;
}

function RecipeIngredientsList({ recipeId }: RecipeIngredientsListProps) {
  const { cartDetails, handleItemsUpdate } = useCart();
  const { items } = cartDetails;

  async function onCheckedChange(item: Ingredient, nextChecked = true) {
    handleItemsUpdate([item.id], nextChecked);
    await updateCartItemCheckStatus([item.itemId], nextChecked);
  }

  const cartItem = items.find(item => item.recipe.id === recipeId);
  if (!cartItem) return null;

  return (
    <CartIngredientsSection<Ingredient>
      ingredients={cartItem.ingredients}
      renderContent={ingredient => (
        <>
          <div className='flex gap-x-2 text-base'>
            <p className='font-medium'>{ingredient.name}</p>
            <p className='text-muted-foreground'>
              {applyQuantityToUnit(ingredient.unit, cartItem.quantity)}
            </p>
          </div>
          <RemoveIngredient
            cartItemIds={[ingredient.itemId]}
            ingredientIds={[ingredient.id]}
            defaultChecked={false}
          />
        </>
      )}
      checked={false}
      onClick={onCheckedChange}
    />
  );
}

export { RecipeIngredientsList };
