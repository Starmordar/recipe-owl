'use client';

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

  return <SwipableTabs tabs={tabs} defaultTab='recipes' />;
}

export default CartTabs;
