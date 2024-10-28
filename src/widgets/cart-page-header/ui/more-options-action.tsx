'use client';

import { EllipsisVertical } from 'lucide-react';

import HeaderIconButton from '@/src/shared/ui/app-header-icon-button';
import { CartActionsDrawer } from '@/src/widgets/cart-actions-drawer';

function MoreOptionsAction() {
  return (
    <CartActionsDrawer>
      <HeaderIconButton Icon={<EllipsisVertical />} aria-label='More Options' />
    </CartActionsDrawer>
  );
}

export { MoreOptionsAction };
