'use client';

import { applyQuantityToUnit } from '@/components/grocery-cart/utils/applyQuantityToUnit';
import { useUserCart } from '@/context/userCartProvider';

import IngredientsSection from '../../ingredients-section';
import RemoveIngredient from '../../ingredients-section/components/remove-ingredient';

import type { CartWithRecipes } from '@/lib/data/cart';

type Ingredient = CartWithRecipes['checked'][number] & { name: string };

function IngredientsList() {
  const { cartDetails } = useUserCart();
  const { checked: ingredients } = cartDetails;

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
      checked
    />
  );
}

export default IngredientsList;
