'use client';

import { useDrag } from '@use-gesture/react';
import { m, useAnimationControls } from 'framer-motion';
import { useRef, useState, ReactNode, useLayoutEffect } from 'react';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Tab {
  title: string;
  content: ReactNode;
}

interface SwipableTabsProps {
  defaultTab: string;
  tabs: Record<string, Tab>;
  options?: { swipeThreshold?: number };
}

interface TriggerSwipeAnimationOptions {
  animate: boolean;
  stop: boolean;
  offsetX?: number;
}

function SwipableTabs({ defaultTab, tabs, options }: SwipableTabsProps) {
  const [currentTab, setCurrentTab] = useState(defaultTab);
  const controls = useAnimationControls();

  const currentTabIndex = useRef(Object.keys(tabs).indexOf(currentTab));
  const contentContainerRef = useRef<HTMLDivElement>(null);
  const [initialWidth, setInitialWidth] = useState<number | null>(null);

  const tabCount = Object.keys(tabs).length;

  const bind = useDrag(
    ({ distance, down, direction, velocity, movement, last, cancel }) => {
      const containerWidth = contentContainerRef.current?.offsetWidth ?? 0;

      const [velocityX] = velocity;
      const [distanceX] = distance;
      const [directionX] = direction;

      if (directionX < 0 && currentTabIndex.current === tabCount - 1) return;
      if (directionX > 0 && currentTabIndex.current === 0) return;

      const swipeThreshold = options?.swipeThreshold ?? 0.5;
      if (Math.abs(velocityX) > swipeThreshold || distanceX > containerWidth / 3) {
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

      triggerSwipeAnimation({ stop: true, animate: last, offsetX: down ? movement[0] : 0 });
    },
    {
      filterTaps: true,
      pointer: { touch: true },
      axis: 'x',
    },
  );

  useLayoutEffect(() => {
    const containerWidth = contentContainerRef.current?.offsetWidth ?? 0;
    setInitialWidth(containerWidth);
  }, []);

  function triggerSwipeAnimation({ animate, stop, offsetX }: TriggerSwipeAnimationOptions) {
    const containerWidth = contentContainerRef.current?.offsetWidth ?? 0;
    const animationFn = animate ? controls.start : controls.set;

    if (stop) controls.stop();
    animationFn(i => {
      const x = (i - currentTabIndex.current) * containerWidth + (offsetX ?? 0);
      return { x, transition: { type: 'spring', stiffness: 250, damping: 30 } };
    });
  }

  function onTabChange(value: string) {
    currentTabIndex.current = Object.keys(tabs).indexOf(value);
    setCurrentTab(value);

    triggerSwipeAnimation({ stop: true, animate: true });
  }

  return (
    <Tabs
      value={currentTab}
      onValueChange={onTabChange}
      className='flex flex-col relative mr-auto w-full flex-grow'
    >
      <TabsList className='inline-flex h-10 items-center text-muted-foreground w-full justify-start rounded-none border-b bg-transparent p-0'>
        {Object.keys(tabs).map(tab => (
          <TabsTrigger key={tab} className='flex-1' value={tab}>
            {tabs[tab].title}
          </TabsTrigger>
        ))}
      </TabsList>

      <div
        {...bind()}
        ref={contentContainerRef}
        className='relative flex flex-grow overflow-x-hidden touch-none'
      >
        {Object.keys(tabs).map((tab, i) => {
          if (initialWidth === null) return null;

          return (
            <m.div
              key={tab}
              className='absolute inset-0 overflow-x-hidden px-4 pt-2 pb-4'
              initial={{ x: (i - currentTabIndex.current) * initialWidth }}
              custom={i}
              animate={controls}
            >
              {tabs[tab].content}
            </m.div>
          );
        })}
      </div>
    </Tabs>
  );
}

export default SwipableTabs;
