'use client';

import EditSharedIngredietDrawer from '@/components/edit-shared-ingredient-drawer';
import mergeIngredients from '@/components/grocery-cart/utils/mergeIngredients';
import { useUserCart } from '@/context/userCartProvider';

import IngredientsSection from '../../ingredients-section';
import RemoveIngredient from '../../ingredients-section/components/remove-ingredient';

import type { SharedIngredient } from '@/lib/data/cart';

function IngredientsList() {
  const { cartDetails } = useUserCart();
  const { shared: ingredients } = cartDetails;

  if (ingredients.length === 0) return null;

  return (
    <IngredientsSection<SharedIngredient>
      ingredients={ingredients}
      renderContent={(item: SharedIngredient) => (
        <>
          <EditSharedIngredietDrawer item={item}>
            <div className='flex flex-col grow'>
              <p className='font-medium'>{item.name}</p>
              {mergeIngredients(item).map((unit, i) => (
                <p key={i} className='text-muted-foreground leading-tight'>
                  {unit}
                </p>
              ))}
            </div>
          </EditSharedIngredietDrawer>

          <RemoveIngredient
            cartItemIds={item.ingredients.map(i => i.itemId)}
            ingredientIds={item.ingredients.map(i => i.id)}
            defaultChecked={false}
          />
        </>
      )}
      checked={false}
    />
  );
}

export default IngredientsList;
