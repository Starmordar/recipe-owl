import { v4 as uuidv4 } from 'uuid';

import { enableCartSharing } from '@/app/(main)/cart/actions';
import { cartShareData } from '@/config/share';
import { publicUrls } from '@/config/url';

import { useServerAction } from '../useServerAction';
import useWebShare from '../useWebShare';

interface UseShareCartOptions {
  cart: { id: number; shareToken: string | null };
}

function useShareCart({ cart }: UseShareCartOptions) {
  const [enableCartSharingAction, isPending] = useServerAction(enableCartSharing);
  const { handleShare, shareAllowed } = useWebShare({ data: cartShareData });

  async function handleCartShare() {
    const shareToken = cart.shareToken ?? uuidv4();
    const url = publicUrls.cartWithToken(shareToken);
    if (!shareAllowed(url)) return;

    await handleShare(url);
    if (!cart.shareToken) await enableCartSharingAction(cart.id, shareToken);
  }

  return { handleCartShare, isPending };
}

export default useShareCart;
