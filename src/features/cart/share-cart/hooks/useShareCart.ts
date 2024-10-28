import { v4 as uuidv4 } from 'uuid';

import { publicUrls } from '@/src/shared/config/url';
import useServerAction from '@/src/shared/hooks/useServerAction';
import useWebShare from '@/src/shared/hooks/useWebShare';

import { cartShareInfo } from '../config/share-info';
import { enableCartSharing } from '../model/enable-cart-share';

interface UseShareCartOptions {
  cart: { id: number; shareToken: string | null };
}

function useShareCart({ cart }: UseShareCartOptions) {
  const [enableCartSharingAction, isPending] = useServerAction(enableCartSharing);
  const { shareContent, isShareSupported } = useWebShare({ shareData: cartShareInfo });

  async function handleCartShare() {
    const shareToken = cart.shareToken ?? uuidv4();
    const url = publicUrls.cartWithToken(shareToken);
    if (!isShareSupported(url)) return;

    await shareContent(url);
    if (!cart.shareToken) await enableCartSharingAction(cart.id, shareToken);
  }

  return { handleCartShare, isPending };
}

export { useShareCart };
