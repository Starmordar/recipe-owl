'use client';

import { ClipboardCheck } from 'lucide-react';

import { CartSectionHeader, useCart } from '@/src/entities/cart';
import { ClearChecked } from '@/src/features/cart/clear-checked-items';
import { Card } from '@/src/shared/ui/card';

import { CheckedIngredientsList } from './ingredients-list';

function CheckedIngredientsSection() {
  const { cartDetails } = useCart();
  const { checked: ingredients } = cartDetails;

  if (ingredients.length === 0) return null;

  return (
    <Card className='flex flex-col gap-y-2 p-4'>
      <div className='flex gap-4'>
        <CartSectionHeader title='Checked Ingredients' Icon={<ClipboardCheck />}>
          <ClearChecked />
        </CartSectionHeader>
      </div>

      <div className='grid gap-2'>
        <CheckedIngredientsList />
      </div>
    </Card>
  );
}

export { CheckedIngredientsSection };
