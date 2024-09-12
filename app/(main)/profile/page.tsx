import { redirect } from 'next/navigation';

import { validateRequest } from '@/app/(auth)/actions';
import { publicUrls } from '@/config/url';

export default async function Page() {
  const { user } = await validateRequest();
  if (user === null) redirect(publicUrls.signIn);

  return <p>Profile Page</p>;
}
