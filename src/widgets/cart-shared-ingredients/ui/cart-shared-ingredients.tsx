'use client';

import { ClipboardList } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { CartSectionHeader, useCart } from '@/src/entities/cart';
import { Card } from '@/src/shared/ui/card';

import { SharedIngredientsList } from './ingredients-list';

function SharedIngredientsSection() {
  const t = useTranslations('CartPage');
  const { cartDetails } = useCart();
  const { shared: ingredients } = cartDetails;

  if (ingredients.length === 0) return null;

  return (
    <Card className='flex flex-col gap-y-2 p-4'>
      <div className='flex gap-4'>
        <CartSectionHeader title={t('sharedIngredientsSectionTitle')} Icon={<ClipboardList />} />
      </div>

      <div className='grid gap-2'>
        <SharedIngredientsList />
      </div>
    </Card>
  );
}

export { SharedIngredientsSection };
