'use client';

import { EllipsisVertical } from 'lucide-react';

import HeaderIconButton from '@/components/layout/app-header/components/icon-button';

import CartActionsDrawer from '../../cart-actions-drawer';

import type { CartWithUser } from '@/types/api';

interface MoreOptionsActionProps {
  isCartOwner: boolean;
  userId: string;
  cartId: number;
  availableCarts: Array<CartWithUser>;
}

function MoreOptionsAction({
  isCartOwner,
  userId,
  cartId,
  availableCarts,
}: MoreOptionsActionProps) {
  return (
    <CartActionsDrawer
      userId={userId}
      cartId={cartId}
      isCartOwner={isCartOwner}
      availableCarts={availableCarts}
    >
      <HeaderIconButton Icon={<EllipsisVertical />} />
    </CartActionsDrawer>
  );
}

export default MoreOptionsAction;
