'use client';

import { Share2 } from 'lucide-react';

import HeaderIconButton from '@/components/layout/app-header/components/icon-button';
import useShareCart from '@/hooks/cart/useShareCart';

import type { CartDetails } from '@/types/api';

interface ShareActionProps {
  cart: CartDetails;
}

function ShareAction({ cart }: ShareActionProps) {
  const { handleCartShare, isPending } = useShareCart({ cart });

  return (
    <HeaderIconButton
      Icon={<Share2 />}
      onClick={handleCartShare}
      loading={isPending}
      loadingText=''
      loadingClassName='h-5 w-5'
    />
  );
}

export default ShareAction;
