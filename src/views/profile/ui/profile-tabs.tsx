'use client';

import { LazyMotion } from 'framer-motion';
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
        title: t('savedRecipes'),
        content: <SavedRecipes recipes={savedRecipes} />,
      },
      created: {
        title: t('createdRecipes'),
        content: <CreatedRecipes recipes={createdRecipes} />,
      },
    }),
    [createdRecipes, savedRecipes, t],
  );

  const loadAnimationFeatures = () =>
    import('@/src/shared/lib/framer-motion/dom-max').then(res => res.default);

  return (
    <LazyMotion features={loadAnimationFeatures} strict>
      <SwipableTabs tabs={tabs} loader={<ProfileTabsSkeleton />} defaultTab='saved' />
    </LazyMotion>
  );
}

export { ProfileTabs };
