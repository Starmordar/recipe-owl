'use client';

import { createContext, useContext, PropsWithChildren, useState, useEffect } from 'react';

import { getCartWithItems, type CartWithRecipes } from '@/lib/data/cart';

import type { CartWithUser } from '@/types/api';

interface UserCartContext {
  userId: string;
  cartId: number;
  isCartOwner: boolean;
  sharedCarts: Array<CartWithUser>;
  cartDetails: CartWithRecipes;
}

interface UserCartContextType extends UserCartContext {
  handleItemsUpdate: (ingrediendIds: Array<number>, nextChecked: boolean) => void;
}

const UserCartContext = createContext<UserCartContextType>({} as UserCartContextType);

interface UserCartProviderProps extends UserCartContext, PropsWithChildren {
  cartDetails: CartWithRecipes;
}

function UserCartProvider({
  children,
  userId,
  cartId,
  isCartOwner,
  sharedCarts,
  cartDetails,
}: UserCartProviderProps) {
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

    const updated = getCartWithItems({ ...details.cart, items: updatedItems });
    setDetails(updated);
  }

  return (
    <UserCartContext.Provider
      value={{ userId, cartId, isCartOwner, sharedCarts, cartDetails: details, handleItemsUpdate }}
    >
      {children}
    </UserCartContext.Provider>
  );
}

function useUserCart(): UserCartContextType {
  return useContext(UserCartContext);
}

export { UserCartProvider, useUserCart };
