import { redirect } from 'next/navigation';

import { validateRequest } from '@/app/(auth)/actions';
import GroceryCart from '@/components/grocery-cart';
import { publicUrls } from '@/config/url';
import { UserCartProvider } from '@/context/userCartProvider';
import useGroceryCart from '@/hooks/cart/useGroceryCart';

import PageHeader from './_components/page-header';
import CartTabs from './_components/tabs';
import { assignUserToSharedCart, getSharedCarts } from './actions';

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

  const { getCartDetails } = useGroceryCart({ userId: user.id, shareToken });
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
        {/* <GroceryCart cartWithRecipes={cartDetails} /> */}
      </main>
    </UserCartProvider>
  );
}

export default Page;
