'use client';

import { LoaderCircle } from 'lucide-react';
import { useState } from 'react';

import { useCart } from '@/src/entities/cart';

import { updateServings } from '../model/update-servings';

import useServerAction from '@/src/shared/hooks/useServerAction';
import { NumberInputSpinner } from '@/src/shared/ui/number-input-spinner';

interface ServingsInput {
  recipeId: number;
  quantity: number;
}

function ServingsInput({ recipeId, quantity }: ServingsInput) {
  const { cartId } = useCart();
  const [updateServingsAction, isPending] = useServerAction(updateServings);
  const [value, setValue] = useState<number>(quantity);

  async function handleServingsUpdate(value: number) {
    setValue(value);
    await updateServingsAction(cartId, recipeId, value);
  }

  return (
    <div className='flex justify-between items-center gap-4 mr-1'>
      <div className='flex items-center gap-2'>
        <NumberInputSpinner value={value} onValueChange={handleServingsUpdate} />
      </div>

      {isPending && <LoaderCircle className='h-6 w-6 animate-spin' />}
    </div>
  );
}

export { ServingsInput };
