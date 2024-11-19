import { redirect } from 'next/navigation';

import { getSavedRecipes } from '@/src/entities/recipe';
import { getCreatedRecipes } from '@/src/entities/recipe/api/get-created-recipe';
import { validateRequest } from '@/src/shared/api/auth';
import { publicUrls } from '@/src/shared/config/url';

import { ProfileHeader } from './profile-header/profile-header';
import { ProfileTabs } from './profile-tabs';

async function ProfilePage() {
  const { user } = await validateRequest();
  if (user === null) redirect(publicUrls.signIn);

  const savedRecipes = await getSavedRecipes(user.id);
  const createdRecipes = await getCreatedRecipes(user.id);

  return (
    <>
      <ProfileHeader user={user} />
      <ProfileTabs user={user} savedRecipes={savedRecipes} createdRecipes={createdRecipes} />
    </>
  );
}

export { ProfilePage };
