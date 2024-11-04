'use client';

import { X } from 'lucide-react';

import { useCart } from '@/src/entities/cart';
import { useServerAction } from '@/src/shared/lib/use-server-action';
import { Button } from '@/src/shared/ui/button';

import { clearCheckedItems } from '../model/clear-checked';

function ClearChecked() {
  const { cartId } = useCart();
  const [clearCheckedAction, isPending] = useServerAction(clearCheckedItems);

  return (
    <Button
      className='px-1'
      variant='ghost'
      size='icon-xs'
      onClick={() => clearCheckedAction(cartId)}
      loading={isPending}
      loadingText=''
      loadingClassName='h-5 w-5'
    >
      <X className='h-5 w-5' />
    </Button>
  );
}

export { ClearChecked };
