'use client';

import { LazyMotion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

import SwipableTabs from '@/src/shared/ui/swipable-tabs';

import { CreatedRecipes } from './created-recipes';
import { ProfileTabsSkeleton } from './profile-tabs-skeleton';
import { SavedRecipes } from './saved-recipes';

import type { RecipeWithUser } from '@/src/entities/recipe';
import type { Recipe } from '@prisma/client';
import type { User } from 'lucia';

interface ProfileTabsProps {
  user: User;
  savedRecipes: Array<RecipeWithUser>;
  createdRecipes: Array<Recipe>;
}

function ProfileTabs({ savedRecipes, createdRecipes, user }: ProfileTabsProps) {
  const t = useTranslations('ProfilePage.Tabs');
  const tabs = useMemo(
    () => ({
      saved: {
        title: <TabTitle title={t('savedRecipes')} count={savedRecipes.length} />,
        content: <SavedRecipes recipes={savedRecipes} />,
      },
      created: {
        title: <TabTitle title={t('createdRecipes')} count={createdRecipes.length} />,
        content: <CreatedRecipes recipes={createdRecipes} />,
      },
    }),
    [createdRecipes, savedRecipes, t],
  );

  const loadAnimationFeatures = () =>
    import('@/src/shared/lib/framer-motion/dom-max').then(res => res.default);

  return (
    <LazyMotion features={loadAnimationFeatures} strict>
      <SwipableTabs
        tabs={tabs}
        loader={<ProfileTabsSkeleton />}
        defaultTab='saved'
        triggerClassName='md:flex-none'
        contentClassName='px-0 pt-4'
      />
    </LazyMotion>
  );
}

interface TabTitleProps {
  title: string;
  count: number;
}

function TabTitle({ title, count }: TabTitleProps) {
  return (
    <>
      {title}
      <span className='ml-1.5 text-sm font-medium text-muted-foreground'>{count}</span>
    </>
  );
}

export { ProfileTabs };
