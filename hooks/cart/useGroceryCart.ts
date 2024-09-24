import { getCartByShareToken, getOrCreateCartByUser } from '@/lib/data/cart';

interface UseGroceryCartOptions {
  userId: string;
  shareToken: string | undefined;
}

function useGroceryCart({ userId, shareToken }: UseGroceryCartOptions) {
  function getCartDetails() {
    if (shareToken) return getCartByShareToken(shareToken);
    return getOrCreateCartByUser(userId);
  }

  return { getCartDetails };
}

export default useGroceryCart;
