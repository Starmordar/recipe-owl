import { redirect } from 'next/navigation';

import { publicUrls } from '@/config/url';
import { validateRequest } from '@/entities/session';

import ProfileTabs from './_components/profile-tabs';

export default async function Page() {
  const { user } = await validateRequest();
  if (user === null) redirect(publicUrls.signIn);

  return <ProfileTabs user={user} />;
}
