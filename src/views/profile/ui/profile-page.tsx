import { redirect } from 'next/navigation';

import { validateRequest } from '@/src/entities/session';
import { publicUrls } from '@/src/shared/config/url';

import { ProfileTabs } from './profile-tabs';

async function ProfilePage() {
  const { user } = await validateRequest();
  if (user === null) redirect(publicUrls.signIn);

  return <ProfileTabs user={user} />;
}

export { ProfilePage };
