'use client';

import { useDrag } from '@use-gesture/react';
import { motion, useAnimationControls } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

import GroceryCart from '@/components/grocery-cart';
import IngredientsList from '@/components/grocery-cart/ingredients-list';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CartWithRecipes } from '@/lib/data/cart';

interface ProfileTabsProps {
  cartWithRecipes: CartWithRecipes;
}

const tabs = {
  saved: {
    title: 'Recipes',
    content: GroceryCart,
  },
  yourRecipes: {
    title: 'All Ingredients',
    content: IngredientsList,
  },
};

function CartTabs({ cartWithRecipes }: ProfileTabsProps) {
  const [currentTab, setCurrentTab] = useState('saved');
  const currentTabIndex = useRef(Object.keys(tabs).indexOf(currentTab));
  const controls = useAnimationControls();

  function onTabChange(value: string) {
    currentTabIndex.current = Object.keys(tabs).indexOf(value);
    setCurrentTab(value);

    controls.start(i => {
      const x = `${(i - currentTabIndex.current) * 100}vw`;
      return { x, transition: { type: 'spring', stiffness: 250, damping: 30 } };
    });
  }

  const tabCount = Object.keys(tabs).length;

  const bind = useDrag(
    ({ distance, down, direction, movement, last, cancel }) => {
      const viewportWidth = window.innerWidth;

      const [distanceX] = distance;
      const [directionX] = direction;

      if (directionX < 0 && currentTabIndex.current === tabCount - 1) return;
      if (directionX > 0 && currentTabIndex.current === 0) return;

      if (down && distanceX > viewportWidth / 2) {
        if (directionX < 0 && currentTabIndex.current < tabCount - 1) {
          currentTabIndex.current = currentTabIndex.current + 1;
        }
        if (directionX > 0 && currentTabIndex.current !== 0) {
          currentTabIndex.current = currentTabIndex.current - 1;
        }

        const nextTab = Object.keys(tabs)[currentTabIndex.current];
        onTabChange(nextTab);
        cancel();
        return;
      }

      const callback = last ? controls.start : controls.set;

      callback(i => {
        const isVisible = currentTabIndex.current === i;
        const baseX = `${(i - currentTabIndex.current) * 100}vw`;
        const basePxX = `${down ? movement[0] : 0}px`;

        const x = (i - currentTabIndex.current) * viewportWidth + (down ? movement[0] : 0);
        console.log('x :>> ', x);

        return { x, transition: { type: 'spring', stiffness: 250, damping: 30 } };
      });
    },
    {
      filterTaps: true, // Prevents taps from triggering drag
      pointer: { touch: true }, // Only use touch events for gestures
      axis: 'x',
    },
  );

  useEffect(() => {
    controls.start(i => {
      const isVisible = currentTabIndex.current === i;
      const x = `${(i - currentTabIndex.current) * 100}vw`;

      return { x, transition: { type: 'spring', stiffness: 250, damping: 30 } };
    });
  }, [controls]);

  return (
    <Tabs
      value={currentTab}
      onValueChange={onTabChange}
      className='flex flex-col relative mr-auto w-full flex-grow'
    >
      <TabsList className='inline-flex h-10 items-center text-muted-foreground w-full justify-start rounded-none border-b bg-transparent p-0'>
        <TabsTrigger className='flex-1' value='saved'>
          Recipes
        </TabsTrigger>
        <TabsTrigger className='flex-1' value='yourRecipes'>
          All Ingredients
        </TabsTrigger>
      </TabsList>

      <div {...bind()} className='relative flex flex-grow overflow-x-hidden'>
        {Object.keys(tabs).map((tab, i) => {
          const isVisible = currentTabIndex.current === i;
          const x = `${(i - currentTabIndex.current) * 100}vw`;

          const Component = tabs[tab as keyof typeof tabs].content;

          return (
            <motion.div
              key={tab}
              custom={i}
              initial={{ x }}
              className='absolute inset-0 overflow-x-hidden px-4 pt-2 pb-4'
              animate={controls}
              // animate={{
              //   x,
              //   display: isVisible ? 'block' : 'none',
              //   transition: { type: 'spring', stiffness: 250, damping: 30 }
              // }}
            >
              <Component cartWithRecipes={cartWithRecipes} />
            </motion.div>
          );
        })}
      </div>

      {/* <TabsContent value='saved' className='px-4 pt-2 !flex w-full'>
        <GroceryCart cartWithRecipes={cartWithRecipes} />
      </TabsContent>
      <TabsContent value='yourRecipes' className='px-4 !flex  w-full'>
        <IngredientsList cartWithRecipes={cartWithRecipes} />
      </TabsContent> */}
    </Tabs>
  );
}

export default CartTabs;
