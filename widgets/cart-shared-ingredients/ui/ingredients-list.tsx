'use client';

import {
  useCart,
  groupCartIngredient,
  CartIngredientsSection,
  updateCartItemCheckStatus,
} from '@/entities/cart';
import { RemoveIngredient } from '@/features/cart/remove-ingredient';

import type { CartSharedIngredient } from '@/entities/cart';

function SharedIngredientsList() {
  const { cartDetails, handleItemsUpdate } = useCart();
  const { shared: ingredients } = cartDetails;

  function getCartItemIds(item: CartSharedIngredient) {
    const cartItemIds = item.ingredients.map(i => i.itemId);
    const ingredientIds = item.ingredients.map(i => i.id);

    return { cartItemIds, ingredientIds };
  }

  async function onCheckedChange(item: CartSharedIngredient, nextChecked = true) {
    const { cartItemIds, ingredientIds } = getCartItemIds(item);

    handleItemsUpdate(ingredientIds, nextChecked);
    await updateCartItemCheckStatus(cartItemIds, nextChecked);
  }

  if (ingredients.length === 0) return null;

  return (
    <CartIngredientsSection<CartSharedIngredient>
      ingredients={ingredients}
      renderContent={(item: CartSharedIngredient) => (
        <>
          <div className='flex w-full gap-x-2 text-base whitespace-nowrap flex-grow flex-wrap mr-2'>
            <span className='font-medium'>{item.name}</span>

            {groupCartIngredient(item).map((unit, i) => (
              <span
                key={i}
                className="text-muted-foreground after:content-[','] last:after:content-['']"
              >
                {unit}
              </span>
            ))}
          </div>

          <RemoveIngredient
            cartItemIds={item.ingredients.map(i => i.itemId)}
            ingredientIds={item.ingredients.map(i => i.id)}
            defaultChecked={false}
          />
        </>
      )}
      onClick={onCheckedChange}
      checked={false}
    />
  );
}

export { SharedIngredientsList };
