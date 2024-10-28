'use client';

import { LazyMotion } from 'framer-motion';
import { useMemo } from 'react';

import GroceryCart from '@/src/components/grocery-cart';
import IngredientsList from '@/src/components/grocery-cart/ingredients-list';

import type { CartWithRecipes } from '@/src/entities/cart';

import SwipableTabs from '@/src/shared/ui/swipable-tabs';

interface CartTabsProps {
  cartWithRecipes: CartWithRecipes;
}

function CartTabs({ cartWithRecipes }: CartTabsProps) {
  const tabs = useMemo(
    () => ({
      recipes: {
        title: 'Recipes',
        content: <GroceryCart cartWithRecipes={cartWithRecipes} />,
      },
      ingredient: {
        title: 'All Ingredients',
        content: <IngredientsList cartWithRecipes={cartWithRecipes} />,
      },
    }),
    [cartWithRecipes],
  );

  const loadAnimationFeatures = () => import('@/src/shared/lib/framer-motion').then(res => res.default);

  return (
    <LazyMotion features={loadAnimationFeatures} strict>
      <SwipableTabs tabs={tabs} defaultTab='recipes' />
    </LazyMotion>
  );
}

export { CartTabs };
