'use client';

import React from 'react';

import { updateCartItemCheckStatus } from '@/app/(main)/cart/actions';
import { applyQuantityToUnit } from '@/components/grocery-cart/utils/applyQuantityToUnit';
import { useUserCart } from '@/context/userCartProvider';

import IngredientsSection from '../../ingredients-section';
import RemoveIngredient from '../../ingredients-section/components/remove-ingredient';

import type { RecipeItemInCart } from '@/entities/cart';

type Ingredient = RecipeItemInCart['ingredients'][number];

interface IngredientsListProps {
  recipeId: number;
}

function IngredientsList({ recipeId }: IngredientsListProps) {
  const { cartDetails, handleItemsUpdate } = useUserCart();
  const { items } = cartDetails;

  async function onCheckedChange(item: Ingredient, nextChecked = true) {
    handleItemsUpdate([item.id], nextChecked);
    await updateCartItemCheckStatus([item.itemId], nextChecked);
  }

  const cartItem = items.find(item => item.recipe.id === recipeId);
  if (!cartItem) return null;

  return (
    <IngredientsSection<Ingredient>
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

export default IngredientsList;
