import { redirect } from 'next/navigation';

import { validateRequest } from '@/src/entities/session';
import { publicUrls } from '@/src/shared/config/url';

import ProfileTabs from './_components/profile-tabs';

export default async function Page() {
  const { user } = await validateRequest();
  if (user === null) redirect(publicUrls.signIn);

  return <ProfileTabs user={user} />;
}
