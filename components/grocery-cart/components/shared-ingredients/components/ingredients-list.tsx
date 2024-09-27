'use client';

import { updateCartItemCheckStatus } from '@/app/(main)/cart/actions';
import mergeIngredients from '@/components/grocery-cart/utils/mergeIngredients';
import { useUserCart } from '@/context/userCartProvider';

import IngredientsSection from '../../ingredients-section';
import RemoveIngredient from '../../ingredients-section/components/remove-ingredient';

import type { SharedIngredient } from '@/lib/data/cart';

function IngredientsList() {
  const { cartDetails, handleItemsUpdate } = useUserCart();
  const { shared: ingredients } = cartDetails;

  function getCartItemIds(item: SharedIngredient) {
    const cartItemIds = item.ingredients.map(i => i.itemId);
    const ingredientIds = item.ingredients.map(i => i.id);

    return { cartItemIds, ingredientIds };
  }

  async function onCheckedChange(item: SharedIngredient, nextChecked = true) {
    const { cartItemIds, ingredientIds } = getCartItemIds(item);

    handleItemsUpdate(ingredientIds, nextChecked);
    await updateCartItemCheckStatus(cartItemIds, nextChecked);
  }

  if (ingredients.length === 0) return null;

  return (
    <IngredientsSection<SharedIngredient>
      ingredients={ingredients}
      renderContent={(item: SharedIngredient) => (
        <>
          <div className='flex w-full gap-x-2 text-base whitespace-nowrap flex-grow flex-wrap mr-2'>
            <span className='font-medium'>{item.name}</span>

            {mergeIngredients(item).map((unit, i) => (
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
