import NextImage from 'next/image';
import Link from 'next/link';

import { DrawerActionButton, DrawerClose } from '@/components/ui/drawer';
import { publicUrls } from '@/config/url';

import type { CartWithUser } from '@/types/api';

interface CartListItemProps {
  isOwner: boolean;
  cart: CartWithUser;
}

function CartListItem({ isOwner, cart }: CartListItemProps) {
  const href = isOwner ? publicUrls.cart : publicUrls.cartWithToken(cart.shareToken);

  return (
    <Link href={href}>
      <DrawerClose>
        <DrawerActionButton>
          {cart.user.picture ? (
            <NextImage
              className='rounded-full'
              height={28}
              width={28}
              src={cart.user.picture}
              alt='Profile Picture'
            />
          ) : (
            <div className='h-7 w-7 rounded-full bg-purple-600'></div>
          )}

          <p>{cart.user.fullName}</p>
        </DrawerActionButton>
      </DrawerClose>
    </Link>
  );
}

export default CartListItem;
