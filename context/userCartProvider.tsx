'use client';

import { createContext, useContext, PropsWithChildren } from 'react';

import type { CartWithUser } from '@/types/api';

interface UserCartContextType {
  userId: string;
  cartId: number;
  isCartOwner: boolean;
  sharedCarts: Array<CartWithUser>;
}

const UserCartContext = createContext<UserCartContextType>({} as UserCartContextType);

interface UserCartProviderProps extends UserCartContextType, PropsWithChildren {}

function UserCartProvider({
  children,
  userId,
  cartId,
  isCartOwner,
  sharedCarts,
}: UserCartProviderProps) {
  return (
    <UserCartContext.Provider value={{ userId, cartId, isCartOwner, sharedCarts }}>
      {children}
    </UserCartContext.Provider>
  );
}

function useUserCart(): UserCartContextType {
  return useContext(UserCartContext);
}

export { UserCartProvider, useUserCart };
