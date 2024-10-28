'use client';

import { Share2 } from 'lucide-react';

import HeaderIconButton from '@/src/shared/ui/app-header-icon-button';

import { useShareCart } from '../hooks/useShareCart';

import type { CartDetails } from '@/src/entities/cart';

interface ShareCartProps {
  cart: CartDetails;
}

function ShareCart({ cart }: ShareCartProps) {
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

export { ShareCart };
