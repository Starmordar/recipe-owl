import { getLocale } from 'next-intl/server';

import { CartDetailsProvider, getSharedCarts, useCartDetails } from '@/src/entities/cart';
import { assignUserToSharedCart } from '@/src/features/cart/assign-user-to-shared-cart';
import { validateRequest } from '@/src/shared/api/auth';
import { publicUrls } from '@/src/shared/config/url';
import { redirect } from '@/src/shared/i18n/routing';

import { CartPageHeader } from './cart-page-header/cart-page-header';
import { CartTabs } from './cart-tabs';

interface CartPageProps {
  shareToken?: string;
}

async function CartPage({ shareToken }: CartPageProps) {
  const locale = await getLocale();

  const { user } = await validateRequest();
  if (user === null) redirect({ href: publicUrls.signIn, locale });

  if (shareToken) {
    const isExists = await assignUserToSharedCart(user.id, shareToken);
    if (!isExists) redirect({ href: publicUrls.cart, locale });
  }

  const { getCartDetails } = useCartDetails({ userId: user.id, shareToken });
  const cartDetails = await getCartDetails();
  if (cartDetails === null) redirect({ href: publicUrls.cart, locale });

  const sharedCarts = await getSharedCarts(user.id);

  return (
    <CartDetailsProvider
      userId={user.id}
      cartId={cartDetails.cart.id}
      isCartOwner={cartDetails.cart.userId === user.id}
      sharedCarts={sharedCarts}
      cartDetails={cartDetails}
    >
      <CartPageHeader userId={user.id} cart={cartDetails.cart} />

      <main className='page-container max-w-[60rem] px-0 pb-0'>
        <CartTabs cartWithRecipes={cartDetails} />
      </main>
    </CartDetailsProvider>
  );
}

export { CartPage };
