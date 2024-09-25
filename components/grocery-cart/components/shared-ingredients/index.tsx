'use client';

import { Cookie } from 'lucide-react';

import EditSharedIngredietDrawer from '@/components/edit-shared-ingredient-drawer';
import { useUserCart } from '@/context/userCartProvider';

import mergeIngredients from '../../utils/mergeIngredients';
import IngredientsSection from '../ingredients-section';
import RemoveIngredient from '../ingredients-section/components/remove-ingredient';
import SectionHeader from '../section-header';

import type { SharedIngredient } from '@/lib/data/cart';

function SharedIngredientsSection() {
  const { cartDetails } = useUserCart();
  const { shared: ingredients } = cartDetails;

  if (ingredients.length === 0) return null;

  return (
    <div className='flex flex-col gap-y-2 pb-4 pt-4 first:pt-0 last:pb-0'>
      <div className='flex gap-4'>
        <SectionHeader
          title='Shared Ingredients'
          subtitle='Ingredients shared between multiple recipes'
          Icon={<Cookie />}
        />
      </div>

      <div className='grid gap-2'>
        <IngredientsSection<SharedIngredient>
          ingredients={ingredients}
          renderContent={(item: SharedIngredient) => (
            <>
              <EditSharedIngredietDrawer item={item}>
                <div className='flex flex-col grow'>
                  <p className='font-medium leading-none'>{item.name}</p>
                  {mergeIngredients(item).map((unit, i) => (
                    <p key={i} className='text-sm text-muted-foreground'>
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
      </div>
    </div>
  );
}

export default SharedIngredientsSection;
