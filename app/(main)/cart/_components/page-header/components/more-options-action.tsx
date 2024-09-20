'use client';

import { EllipsisVertical } from 'lucide-react';

import HeaderIconButton from '@/components/layout/app-header/components/icon-button';

import CartActionsDrawer from '../../cart-actions-drawer';

interface MoreOptionsActionProps {
  userId: string;
}

function MoreOptionsAction({ userId }: MoreOptionsActionProps) {
  return (
    <CartActionsDrawer userId={userId}>
      <HeaderIconButton Icon={<EllipsisVertical />} />
    </CartActionsDrawer>
  );
}

export default MoreOptionsAction;
