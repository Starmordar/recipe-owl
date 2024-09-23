import NextImage from 'next/image';

import AppHeader from '@/components/layout/app-header';
import { CartWithRecipes } from '@/lib/data/cart';

import MoreOptionsAction from './components/more-options-action';
import ShareAction from './components/share-action';

import type { CartWithUser } from '@/types/api';

interface PageHeaderProps {
  cart: CartWithRecipes['cart'];
  userId: string;
  availableCarts: Array<CartWithUser>;
}

async function PageHeader({ cart, userId, availableCarts }: PageHeaderProps) {
  const isCartOwner = cart?.userId === userId;

  return (
    <AppHeader className='pr-2'>
      <div className='flex justify-between grow items-center'>
        <h1 className='text-lg font-semibold leading-none'>Grocery Cart</h1>

        {cart && (
          <div className='flex items-center gap-x-3'>
            {!isCartOwner && cart?.user.picture && (
              <NextImage
                className='rounded-full'
                height={28}
                width={28}
                src={cart.user.picture}
                alt='Cart Owner Image'
              />
            )}

            <ShareAction cart={cart} />
            <MoreOptionsAction
              userId={userId}
              cartId={cart.id}
              isCartOwner={isCartOwner}
              availableCarts={availableCarts}
            />
          </div>
        )}
      </div>
    </AppHeader>
  );
}

export default PageHeader;
