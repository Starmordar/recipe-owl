import { redirect } from 'next/navigation';

import { CartProvider, getSharedCarts, useCartDetails } from '@/src/entities/cart';
import { validateRequest } from '@/src/entities/session';
import { assignUserToSharedCart } from '@/src/features/cart/assign-user-to-shared-cart';
import { publicUrls } from '@/src/shared/config/url';

import { CartPageHeader } from './cart-page-header/cart-page-header';
import { CartTabs } from './cart-tabs';

interface CartPageProps {
  shareToken?: string;
}

async function CartPage({ shareToken }: CartPageProps) {
  const { user } = await validateRequest();
  if (user === null) redirect(publicUrls.signIn);

  if (shareToken) {
    const isExists = await assignUserToSharedCart(user.id, shareToken);
    if (!isExists) redirect(publicUrls.cart);
  }

  const { getCartDetails } = useCartDetails({ userId: user.id, shareToken });
  const cartDetails = await getCartDetails();
  if (cartDetails === null) redirect(publicUrls.cart);

  const sharedCarts = await getSharedCarts(user.id);

  return (
    <CartProvider
      userId={user.id}
      cartId={cartDetails.cart.id}
      isCartOwner={cartDetails.cart.userId === user.id}
      sharedCarts={sharedCarts}
      cartDetails={cartDetails}
    >
      <CartPageHeader userId={user.id} cart={cartDetails.cart} />

      <main className='page-container px-0 pb-0'>
        <CartTabs cartWithRecipes={cartDetails} />
      </main>
    </CartProvider>
  );
}

export { CartPage };
