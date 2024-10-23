'use client';

import { Share2 } from 'lucide-react';

import useShareCart from '@/hooks/cart/useShareCart';
import HeaderIconButton from '@/shared/ui/app-header-icon-button';

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
      aria-label='Share Recipe With Others'
    />
  );
}

export default ShareAction;
