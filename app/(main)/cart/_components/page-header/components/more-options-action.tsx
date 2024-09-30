'use client';

import { EllipsisVertical } from 'lucide-react';

import HeaderIconButton from '@/components/layout/app-header/components/icon-button';

import CartActionsDrawer from '../../cart-actions-drawer';

function MoreOptionsAction() {
  return (
    <CartActionsDrawer>
      <HeaderIconButton Icon={<EllipsisVertical />} aria-label='More Options' />
    </CartActionsDrawer>
  );
}

export default MoreOptionsAction;
