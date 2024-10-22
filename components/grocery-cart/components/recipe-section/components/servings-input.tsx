'use client';

import { LoaderCircle } from 'lucide-react';
import { useState } from 'react';

import { updateServings } from '@/app/(main)/cart/actions';
import { useUserCart } from '@/context/userCartProvider';
import useServerAction from '@/shared/hooks/useServerAction';
import { NumberInputSpinner } from '@/shared/ui/number-input-spinner';

interface ServingInputProps {
  recipeId: number;
  quantity: number;
}

function ServingInput({ recipeId, quantity }: ServingInputProps) {
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

export default ServingInput;
