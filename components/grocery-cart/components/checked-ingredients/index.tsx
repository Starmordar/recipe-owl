'use client';

import { ClipboardCheck } from 'lucide-react';

import { Card } from '@/components/ui/card';
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
    <Card className='flex flex-col gap-y-2 p-4'>
      <div className='flex gap-4'>
        <SectionHeader title='Checked Ingredients' Icon={<ClipboardCheck />}>
          <ClearChecked />
        </SectionHeader>
      </div>

      <div className='grid gap-2'>
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
      </div>
    </Card>
  );
}

export default CheckedIngredientsSection;
