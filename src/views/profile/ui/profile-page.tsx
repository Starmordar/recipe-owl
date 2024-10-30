import { redirect } from 'next/navigation';

import { validateRequest } from '@/src/shared/api/auth';
import { publicUrls } from '@/src/shared/config/url';

import { ProfileHeader } from './profile-header';
import { ProfileTabs } from './profile-tabs';

async function ProfilePage() {
  const { user } = await validateRequest();
  if (user === null) redirect(publicUrls.signIn);

  return (
    <>
      <ProfileHeader user={user} />

      <main className='page-container'>
        <ProfileTabs user={user} />
      </main>
    </>
  );
}

export { ProfilePage };
