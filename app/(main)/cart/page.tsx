import { redirect } from 'next/navigation';

import { UserCartProvider } from '@/context/userCartProvider';
import { getSharedCarts, useCartDetails } from '@/entities/cart';
import { validateRequest } from '@/entities/session';
import { assignUserToSharedCart } from '@/features/cart/assign-user-to-shared-cart';
import { publicUrls } from '@/shared/config/url';
import { CartTabs } from '@/widgets/cart-tabs';

import PageHeader from './_components/page-header';

interface PageProps {
  searchParams: { shareToken?: string };
}

async function Page({ searchParams: { shareToken } }: PageProps) {
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
    <UserCartProvider
      userId={user.id}
      cartId={cartDetails.cart.id}
      isCartOwner={cartDetails.cart.userId === user.id}
      sharedCarts={sharedCarts}
      cartDetails={cartDetails}
    >
      <PageHeader userId={user.id} cart={cartDetails.cart} />

      <main className='page-container px-0 pb-0'>
        <CartTabs cartWithRecipes={cartDetails} />
      </main>
    </UserCartProvider>
  );
}

export default Page;
