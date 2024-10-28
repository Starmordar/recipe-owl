'use client';

import { useUserCart } from '@/context/userCartProvider';
import { groupCartIngredient } from '@/entities/cart';
import { updateCartItemCheckStatus } from '@/features/cart/update-item-check-status';

import IngredientsSection from '../../ingredients-section';
import RemoveIngredient from '../../ingredients-section/components/remove-ingredient';

import type { CartSharedIngredient } from '@/entities/cart';

function IngredientsList() {
  const { cartDetails, handleItemsUpdate } = useUserCart();
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
    <IngredientsSection<CartSharedIngredient>
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

export default IngredientsList;
