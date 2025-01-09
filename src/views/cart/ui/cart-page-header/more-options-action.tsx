'use client';

import { EllipsisVertical } from 'lucide-react';
import { useTranslations } from 'next-intl';

import HeaderIconButton from '@/src/shared/ui/app-header-icon-button';
import { CartActionsDrawer } from '@/src/widgets/cart-actions-drawer';

function MoreOptionsAction() {
  const t = useTranslations('CartPage.ActionsDrawer');
  return (
    <CartActionsDrawer>
      <HeaderIconButton Icon={<EllipsisVertical />} aria-label={t('trigger')} />
    </CartActionsDrawer>
  );
}

export { MoreOptionsAction };
