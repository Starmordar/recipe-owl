'use client';

import React from 'react';

import {
  useCart,
  applyQuantityToUnit,
  CartIngredientsSection,
  updateCartItemCheckStatus,
} from '@/src/entities/cart';
import { RemoveIngredient } from '@/src/features/cart/remove-ingredient';

import type { CartWithRecipes } from '@/src/entities/cart';

type Ingredient = CartWithRecipes['checked'][number] & { name: string };

function CheckedIngredientsList() {
  const { cartDetails, handleItemsUpdate } = useCart();
  const { checked: ingredients } = cartDetails;

  async function onCheckedChange(item: Ingredient, nextChecked = false) {
    handleItemsUpdate([item.ingredientId], nextChecked);
    await updateCartItemCheckStatus([item.id], nextChecked);
  }

  if (ingredients.length === 0) return null;

  return (
    <CartIngredientsSection<Ingredient>
      ingredients={ingredients.map(i => ({ ...i, name: i.ingredient.name }))}
      renderContent={item => (
        <>
          <div className='flex gap-x-2 text-base'>
            <p className='font-medium'>{item.name}</p>
            <p className='text-muted-foreground'>
              {applyQuantityToUnit(item.ingredient.unit, item.quantity)}
            </p>
          </div>
          <RemoveIngredient
            cartItemIds={[item.id]}
            ingredientIds={[item.ingredientId]}
            defaultChecked={true}
          />
        </>
      )}
      onClick={onCheckedChange}
      checked
    />
  );
}

export { CheckedIngredientsList };
