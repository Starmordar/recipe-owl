import { useRouter } from 'next/navigation';

import { leaveSharedCart } from '@/app/(main)/cart/actions';
import { publicUrls } from '@/shared/config/url';
import useServerAction from '@/shared/hooks/useServerAction';

interface UseLeaveSharedCart {
  userId: string;
  cartId: number | undefined;
}

function useLeaveSharedCart({ userId, cartId }: UseLeaveSharedCart) {
  const router = useRouter();
  const [leaveCartAction, isPending] = useServerAction(leaveSharedCart);

  async function handleLeaveCart() {
    if (cartId) await leaveCartAction(userId, cartId);
    router.push(publicUrls.cart);
  }

  return { handleLeaveCart, isPending };
}

export default useLeaveSharedCart;
