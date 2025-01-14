'use client';

import { useTranslations } from 'next-intl';

import { useCart, updateCartItemCheckStatus } from '@/src/entities/cart';
import { Checkbox } from '@/src/shared/ui/checkbox';

interface RemoveIngredientProps {
  ingredientIds: Array<number>;
  cartItemIds: Array<number>;
  defaultChecked: boolean;
}

function RemoveIngredient({ cartItemIds, ingredientIds, defaultChecked }: RemoveIngredientProps) {
  const t = useTranslations('CartPage');
  const { handleItemsUpdate } = useCart();
  const inputId = `ingredienIt: ${ingredientIds.toString()}`;

  async function onCheckedChange(nextChecked: boolean) {
    handleItemsUpdate(ingredientIds, nextChecked);
    await updateCartItemCheckStatus(cartItemIds, nextChecked);
  }

  return (
    <div className='flex items-center space-x-2'>
      <Checkbox
        id={inputId}
        className='h-5 w-5'
        defaultChecked={defaultChecked}
        onClick={evt => evt.stopPropagation()}
        onCheckedChange={onCheckedChange}
        aria-label={defaultChecked ? t('uncheckIngredientAction') : t('checkIngredientAction')}
      />
      <label htmlFor={inputId} className='sr-only'>
        {t('checkIngredientLabel')}
      </label>
    </div>
  );
}

export { RemoveIngredient };
