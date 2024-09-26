'use client';

import { ClipboardCheck } from 'lucide-react';

import { Card } from '@/components/ui/card';
import { useUserCart } from '@/context/userCartProvider';

import SectionHeader from '../section-header';

import ClearChecked from './components/clear-checked';
import IngredientsList from './components/ingredients-list';

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
        <IngredientsList />
      </div>
    </Card>
  );
}

export default CheckedIngredientsSection;
