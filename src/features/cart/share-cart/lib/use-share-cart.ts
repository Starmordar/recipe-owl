import { useTranslations } from 'next-intl';
import { v4 as uuidv4 } from 'uuid';

import { publicUrls } from '@/src/shared/config/url';
import { useServerAction } from '@/src/shared/lib/use-server-action';
import { useWebShare } from '@/src/shared/lib/use-web-share';

import { enableCartSharing } from '../api/enable-cart-sharing';
import { getCartShareInfo } from '../config/share-info';

interface UseShareCartOptions {
  cart: { id: number; shareToken: string | null };
}

function useShareCart({ cart }: UseShareCartOptions) {
  const t = useTranslations('CartPage.ShareCart');
  const [enableCartSharingAction, isPending] = useServerAction(enableCartSharing);
  const { shareContent, isShareSupported } = useWebShare({ shareData: getCartShareInfo(t) });

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
