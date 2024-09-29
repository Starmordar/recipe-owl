'use client';

import { LazyMotion } from 'framer-motion';

import GroceryCart from '@/components/grocery-cart';
import IngredientsList from '@/components/grocery-cart/ingredients-list';
import SwipableTabs from '@/components/ui/swipable-tabs';
import { CartWithRecipes } from '@/lib/data/cart';

interface ProfileTabsProps {
  cartWithRecipes: CartWithRecipes;
}

function CartTabs({ cartWithRecipes }: ProfileTabsProps) {
  const tabs = {
    recipes: {
      title: 'Recipes',
      content: <GroceryCart cartWithRecipes={cartWithRecipes} />,
    },
    ingredient: {
      title: 'All Ingredients',
      content: <IngredientsList cartWithRecipes={cartWithRecipes} />,
    },
  };

  const loadFeatures = () => import('@/lib/framer-motion/features').then(res => res.default);
  return (
    <LazyMotion features={loadFeatures}>
      <SwipableTabs tabs={tabs} defaultTab='recipes' />
    </LazyMotion>
  );
}

export default CartTabs;
