'use client';

import { ClipboardCheck } from 'lucide-react';

import { useUserCart } from '@/context/userCartProvider';

import { applyQuantityToUnit } from '../../utils/applyQuantityToUnit';
import IngredientsSection from '../ingredients-section';
import RemoveIngredient from '../ingredients-section/components/remove-ingredient';
import SectionHeader from '../section-header';

import ClearChecked from './components/clear-checked';

import type { CartWithRecipes } from '@/lib/data/cart';

type Ingredient = CartWithRecipes['checked'][number] & { name: string };

function CheckedIngredientsSection() {
  const { cartDetails } = useUserCart();
  const { checked: ingredients } = cartDetails;

  if (ingredients.length === 0) return null;

  return (
    <div className='flex flex-col gap-y-2 pb-4 pt-4 first:pt-0 last:pb-0'>
      <div className='flex gap-4'>
        <SectionHeader
          title='Checked Ingredients'
          subtitle='Ingredients you’ve already selected'
          Icon={<ClipboardCheck />}
        >
          <ClearChecked />
        </SectionHeader>
      </div>

      <div className='grid gap-2'>
        <IngredientsSection<Ingredient>
          ingredients={ingredients.map(i => ({ ...i, name: i.ingredient.name }))}
          renderContent={item => (
            <>
              <div>
                <p className='font-medium leading-none'>{item.name}</p>
                <p className='text-sm text-muted-foreground'>
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
      </div>
    </div>
  );
}

export default CheckedIngredientsSection;
