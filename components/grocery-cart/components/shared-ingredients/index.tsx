'use client';

import { ClipboardList } from 'lucide-react';

import { useUserCart } from '@/context/userCartProvider';
import { Card } from '@/shared/ui/card';

import SectionHeader from '../section-header';

import IngredientsList from './components/ingredients-list';

function SharedIngredientsSection() {
  const { cartDetails } = useUserCart();
  const { shared: ingredients } = cartDetails;

  if (ingredients.length === 0) return null;

  return (
    <Card className='flex flex-col gap-y-2 p-4'>
      <div className='flex gap-4'>
        <SectionHeader title='Shared Ingredients' Icon={<ClipboardList />} />
      </div>

      <div className='grid gap-2'>
        <IngredientsList />
      </div>
    </Card>
  );
}

export default SharedIngredientsSection;
