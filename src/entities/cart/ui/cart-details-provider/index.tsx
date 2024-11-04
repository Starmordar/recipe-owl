'use client';

import { createContext, useContext, useState, useEffect } from 'react';

import { populateCartWithItems } from '@/src/entities/cart';

import type { CartWithRecipes, CartWithUser } from '@/src/entities/cart';
import type { PropsWithChildren } from 'react';

interface CartContext {
  userId: string;
  cartId: number;
  isCartOwner: boolean;
  sharedCarts: Array<CartWithUser>;
  cartDetails: CartWithRecipes;
}

interface CartContextType extends CartContext {
  handleItemsUpdate: (ingrediendIds: Array<number>, nextChecked: boolean) => void;
}

const CartContext = createContext<CartContextType>({} as CartContextType);

interface CartDetailsProviderProps extends CartContext, PropsWithChildren {
  cartDetails: CartWithRecipes;
}

function CartDetailsProvider({
  children,
  userId,
  cartId,
  isCartOwner,
  sharedCarts,
  cartDetails,
}: CartDetailsProviderProps) {
  const [details, setDetails] = useState(cartDetails);

  useEffect(() => {
    setDetails(cartDetails);
  }, [cartDetails]);

  function handleItemsUpdate(ingredientIds: Array<number>, nextChecked: boolean) {
    const updatedItems = details.cart.items.map(item =>
      ingredientIds.some(id => id === item.ingredientId)
        ? { ...item, isChecked: nextChecked }
        : item,
    );

    const updated = populateCartWithItems({ ...details.cart, items: updatedItems });
    setDetails(updated);
  }

  return (
    <CartContext.Provider
      value={{ userId, cartId, isCartOwner, sharedCarts, cartDetails: details, handleItemsUpdate }}
    >
      {children}
    </CartContext.Provider>
  );
}

function useCart(): CartContextType {
  return useContext(CartContext);
}

export { CartDetailsProvider, useCart };
