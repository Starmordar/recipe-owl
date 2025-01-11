import { publicUrls } from '@/src/shared/config/url';
import { useRouter } from '@/src/shared/i18n/routing';
import { useServerAction } from '@/src/shared/lib/use-server-action';

import { leaveSharedCart } from '../api/leave-shared-cart';

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

export { useLeaveSharedCart };
