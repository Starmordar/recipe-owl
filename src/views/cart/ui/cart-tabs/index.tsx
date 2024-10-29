'use client';

import { LazyMotion } from 'framer-motion';
import { useMemo } from 'react';

import SwipableTabs from '@/src/shared/ui/swipable-tabs';

import { CartIngredientsTab } from './ingredients-tab';
import { RecipesTab } from './recipes-tab';
import { TabsContentSkeleton } from './skeleton';

import type { CartWithRecipes } from '@/src/entities/cart';

interface CartTabsProps {
  cartWithRecipes: CartWithRecipes;
}

function CartTabs({ cartWithRecipes }: CartTabsProps) {
  const tabs = useMemo(
    () => ({
      recipes: {
        title: 'Recipes',
        content: <RecipesTab cartWithRecipes={cartWithRecipes} />,
      },
      ingredient: {
        title: 'All Ingredients',
        content: <CartIngredientsTab cartWithRecipes={cartWithRecipes} />,
      },
    }),
    [cartWithRecipes],
  );

  const loadAnimationFeatures = () =>
    import('@/src/shared/lib/framer-motion').then(res => res.default);

  return (
    <LazyMotion features={loadAnimationFeatures} strict>
      <SwipableTabs tabs={tabs} loader={<TabsContentSkeleton />} defaultTab='recipes' />
    </LazyMotion>
  );
}

export { CartTabs };
