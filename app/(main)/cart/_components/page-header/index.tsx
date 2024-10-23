import AppHeader from '@/shared/ui/app-header';
import { UserAvatar } from '@/shared/ui/user-avatar';

import MoreOptionsAction from './components/more-options-action';
import ShareAction from './components/share-action';

import type { CartDetails } from '@/types/api';

interface PageHeaderProps {
  cart: CartDetails;
  userId: string;
}

async function PageHeader({ cart, userId }: PageHeaderProps) {
  const isCartOwner = cart.userId === userId;

  return (
    <AppHeader className='pr-2'>
      <div className='flex justify-between grow items-center'>
        <h1 className='text-lg font-semibold leading-none'>Grocery Cart</h1>

        {cart && (
          <div className='flex items-center gap-x-3'>
            {!isCartOwner && <UserAvatar src={cart.user.picture} />}

            <ShareAction cart={cart} />
            <MoreOptionsAction />
          </div>
        )}
      </div>
    </AppHeader>
  );
}

export default PageHeader;
