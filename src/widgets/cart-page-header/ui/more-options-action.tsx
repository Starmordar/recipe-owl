'use client';

import { EllipsisVertical } from 'lucide-react';

import { CartActionsDrawer } from '@/src/widgets/cart-actions-drawer';

import HeaderIconButton from '@/src/shared/ui/app-header-icon-button';

function MoreOptionsAction() {
  return (
    <CartActionsDrawer>
      <HeaderIconButton Icon={<EllipsisVertical />} aria-label='More Options' />
    </CartActionsDrawer>
  );
}

export { MoreOptionsAction };
