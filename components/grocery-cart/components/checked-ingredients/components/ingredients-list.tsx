'use client';

import React from 'react';

import { updateCartItemCheckStatus } from '@/app/(main)/cart/actions';
import { applyQuantityToUnit } from '@/components/grocery-cart/utils/applyQuantityToUnit';
import { useUserCart } from '@/context/userCartProvider';

import IngredientsSection from '../../ingredients-section';
import RemoveIngredient from '../../ingredients-section/components/remove-ingredient';

import type { CartWithRecipes } from '@/entities/cart';

type Ingredient = CartWithRecipes['checked'][number] & { name: string };

function IngredientsList() {
  const { cartDetails, handleItemsUpdate } = useUserCart();
  const { checked: ingredients } = cartDetails;

  async function onCheckedChange(item: Ingredient, nextChecked = false) {
    handleItemsUpdate([item.ingredientId], nextChecked);
    await updateCartItemCheckStatus([item.id], nextChecked);
  }

  if (ingredients.length === 0) return null;

  return (
    <IngredientsSection<Ingredient>
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

export default IngredientsList;
