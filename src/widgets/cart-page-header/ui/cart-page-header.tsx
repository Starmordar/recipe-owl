import { ShareCart } from '@/src/features/cart/share-cart';

import { MoreOptionsAction } from './more-options-action';

import type { CartDetails } from '@/src/entities/cart';

import AppHeader from '@/src/shared/ui/app-header';
import { UserAvatar } from '@/src/shared/ui/user-avatar';

interface CartPageHeaderProps {
  cart: CartDetails;
  userId: string;
}

async function CartPageHeader({ cart, userId }: CartPageHeaderProps) {
  const isCartOwner = cart.userId === userId;

  return (
    <AppHeader className='pr-2'>
      <div className='flex justify-between grow items-center'>
        <h1 className='text-lg font-semibold leading-none'>Grocery Cart</h1>

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
