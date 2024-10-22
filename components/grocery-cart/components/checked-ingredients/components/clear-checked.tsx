'use client';

import { X } from 'lucide-react';

import { clearCheckedItems } from '@/app/(main)/cart/actions';
import { useUserCart } from '@/context/userCartProvider';
import useServerAction from '@/shared/hooks/useServerAction';
import { Button } from '@/shared/ui/button';

function ClearChecked() {
  const { cartId } = useUserCart();
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

export default ClearChecked;
