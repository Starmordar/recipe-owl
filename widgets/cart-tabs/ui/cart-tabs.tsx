'use client';

import { LazyMotion } from 'framer-motion';
import { useMemo } from 'react';

import GroceryCart from '@/components/grocery-cart';
import IngredientsList from '@/components/grocery-cart/ingredients-list';
import SwipableTabs from '@/shared/ui/swipable-tabs';

import type { CartWithRecipes } from '@/entities/cart';

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

  const loadAnimationFeatures = () =>
    import('@/lib/framer-motion/features').then(res => res.default);

  return (
    <LazyMotion features={loadAnimationFeatures} strict>
      <SwipableTabs tabs={tabs} defaultTab='recipes' />
    </LazyMotion>
  );
}

export { CartTabs };
