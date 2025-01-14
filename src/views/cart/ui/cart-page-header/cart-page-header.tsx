import { useTranslations } from 'next-intl';

import { ShareCart } from '@/src/features/cart/share-cart';
import AppHeader from '@/src/shared/ui/app-header';
import { UserAvatar } from '@/src/shared/ui/user-avatar';

import { MoreOptionsAction } from './more-options-action';

import type { CartDetails } from '@/src/entities/cart';

interface CartPageHeaderProps {
  cart: CartDetails;
  userId: string;
}

function CartPageHeader({ cart, userId }: CartPageHeaderProps) {
  const t = useTranslations('CartPage');
  const isCartOwner = cart.userId === userId;

  return (
    <AppHeader className='pr-2'>
      <div className='flex justify-between grow items-center'>
        <h1 className='text-lg font-semibold leading-none'>{t('title')}</h1>

        {cart && (
          <div className='flex items-center gap-x-3'>
            {!isCartOwner && <UserAvatar src={cart.user.picture} />}

            <ShareCart cart={cart} />
            <MoreOptionsAction />
          </div>
        )}
      </div>
    </AppHeader>
  );
}

export { CartPageHeader };
