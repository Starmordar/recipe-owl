import { getLocale } from 'next-intl/server';

import { getSavedRecipes } from '@/src/entities/recipe';
import { getCreatedRecipes } from '@/src/entities/recipe/api/get-created-recipe';
import { validateRequest } from '@/src/shared/api/auth';
import { publicUrls } from '@/src/shared/config/url';
import { redirect } from '@/src/shared/i18n/routing';

import { ProfileHeader } from './profile-header/profile-header';
import { ProfileStats } from './profile-stats';
import { ProfileTabs } from './profile-tabs';

async function ProfilePage() {
  const { user } = await validateRequest();
  if (user === null) redirect({ href: publicUrls.signIn, locale: await getLocale() });

  const savedRecipes = await getSavedRecipes(user.id);
  const createdRecipes = await getCreatedRecipes(user.id);

  return (
    <>
      <ProfileHeader user={user} />
      <ProfileStats user={user} />
      <ProfileTabs user={user} savedRecipes={savedRecipes} createdRecipes={createdRecipes} />
    </>
  );
}

export { ProfilePage };
