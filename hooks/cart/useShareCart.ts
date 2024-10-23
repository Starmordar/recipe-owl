import { v4 as uuidv4 } from 'uuid';

import { enableCartSharing } from '@/app/(main)/cart/actions';
import { publicUrls } from '@/shared/config/url';
import useServerAction from '@/shared/hooks/useServerAction';
import useWebShare from '@/shared/hooks/useWebShare';

interface UseShareCartOptions {
  cart: { id: number; shareToken: string | null };
}

const cartShareData = {
  title: 'Recipe OWL: Check out my grocery cart!',
  text: 'Here are the items I want to share with you.',
};

function useShareCart({ cart }: UseShareCartOptions) {
  const [enableCartSharingAction, isPending] = useServerAction(enableCartSharing);
  const { shareContent, isShareSupported } = useWebShare({ shareData: cartShareData });

  async function handleCartShare() {
    const shareToken = cart.shareToken ?? uuidv4();
    const url = publicUrls.cartWithToken(shareToken);
    if (!isShareSupported(url)) return;

    await shareContent(url);
    if (!cart.shareToken) await enableCartSharingAction(cart.id, shareToken);
  }

  return { handleCartShare, isPending };
}

export default useShareCart;
