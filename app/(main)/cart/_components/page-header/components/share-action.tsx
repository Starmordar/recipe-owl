'use client';

import { Share2 } from 'lucide-react';

import HeaderIconButton from '@/components/layout/app-header/components/icon-button';
import useShareCart from '@/hooks/useShareCart';

interface ShareActionProps {
  cart: { id: number; shareToken: string | null };
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
