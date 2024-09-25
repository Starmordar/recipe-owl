'use client';

import { updateCartItemCheckStatus } from '@/app/(main)/cart/actions';
import { Checkbox } from '@/components/ui/checkbox';
import { useUserCart } from '@/context/userCartProvider';

interface RemoveIngredientProps {
  ingredientIds: Array<number>;
  cartItemIds: Array<number>;
  defaultChecked: boolean;
}

function RemoveIngredient({ cartItemIds, ingredientIds, defaultChecked }: RemoveIngredientProps) {
  const { handleItemsUpdate } = useUserCart();
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
        onCheckedChange={onCheckedChange}
      />
      <label htmlFor={inputId} className='sr-only'>
        Check item
      </label>
    </div>
  );
}

export default RemoveIngredient;
