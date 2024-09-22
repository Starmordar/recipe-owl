import { getCartByShareToken, getCartByUser } from '@/lib/data/cart';

interface UseGroceryCartOptions {
  shareToken: string | undefined;
}

function useGroceryCart({ shareToken }: UseGroceryCartOptions) {
  function getCart() {
    if (shareToken) return getCartByShareToken(shareToken);
    return getCartByUser();
  }

  return { getCart };
}

export default useGroceryCart;
