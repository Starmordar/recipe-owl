'use client';

import { Share2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

import HeaderIconButton from '@/src/shared/ui/app-header-icon-button';

import { useShareCart } from '../lib/use-share-cart';

import type { CartDetails } from '@/src/entities/cart';

interface ShareCartProps {
  cart: CartDetails;
}

function ShareCart({ cart }: ShareCartProps) {
  const t = useTranslations('CartPage');
  const { handleCartShare, isPending } = useShareCart({ cart });

  return (
    <HeaderIconButton
      Icon={<Share2 />}
      onClick={handleCartShare}
      loading={isPending}
      loadingText=''
      loadingClassName='h-5 w-5'
      aria-label={t('ShareCart.trigger')}
    />
  );
}

export { ShareCart };
