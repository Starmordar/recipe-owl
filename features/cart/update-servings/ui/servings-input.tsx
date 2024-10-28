'use client';

import { LoaderCircle } from 'lucide-react';
import { useState } from 'react';

import { useUserCart } from '@/context/userCartProvider';
import useServerAction from '@/shared/hooks/useServerAction';
import { NumberInputSpinner } from '@/shared/ui/number-input-spinner';

import { updateServings } from '../model/update-servings';

interface ServingsInput {
  recipeId: number;
  quantity: number;
}

function ServingsInput({ recipeId, quantity }: ServingsInput) {
  const { cartId } = useUserCart();
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
