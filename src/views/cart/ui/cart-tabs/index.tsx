'use client';

import { LazyMotion } from 'motion/react';
import { useTranslations } from 'next-intl';
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
  const t = useTranslations('CartPage.Tabs');
  const tabs = useMemo(
    () => ({
      recipes: {
        title: t('recipes'),
        content: <RecipesTab cartWithRecipes={cartWithRecipes} />,
      },
      ingredient: {
        title: t('ingredients'),
        content: <CartIngredientsTab cartWithRecipes={cartWithRecipes} />,
      },
    }),
    [cartWithRecipes, t],
  );

  const loadAnimationFeatures = () =>
    import('@/src/shared/lib/framer-motion/dom-max').then(res => res.default);

  return (
    <LazyMotion features={loadAnimationFeatures} strict>
      <SwipableTabs tabs={tabs} loader={<TabsContentSkeleton />} defaultTab='recipes' />
    </LazyMotion>
  );
}

export { CartTabs };
