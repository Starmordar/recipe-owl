import { getCartByShareToken, getOrCreateCart } from '@/src/entities/cart';

interface UseCartDetailsOptions {
  userId: string;
  shareToken: string | undefined;
}

function useCartDetails({ userId, shareToken }: UseCartDetailsOptions) {
  function getCartDetails() {
    if (shareToken) return getCartByShareToken(shareToken);
    return getOrCreateCart(userId);
  }

  return { getCartDetails };
}

export { useCartDetails };
