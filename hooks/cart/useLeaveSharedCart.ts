import { useRouter } from 'next/navigation';

import { leaveSharedCart } from '@/app/(main)/cart/actions';
import { publicUrls } from '@/config/url';

import { useServerAction } from '../useServerAction';

interface UseLeaveSharedCart {
  userId: string;
  cartId: number;
}

function useLeaveSharedCart({ userId, cartId }: UseLeaveSharedCart) {
  const router = useRouter();
  const [leaveCartAction, isPending] = useServerAction(leaveSharedCart);

  async function handleLeaveCart() {
    await leaveCartAction(userId, cartId);
    router.push(publicUrls.cart);
  }

  return { handleLeaveCart, isPending };
}

export default useLeaveSharedCart;
