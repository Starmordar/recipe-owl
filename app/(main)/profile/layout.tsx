import { validateRequest } from '@/src/entities/session';

import ProfileHeader from '../../../src/views/profile/ui/profile-header';

interface LayoutProps {
  children: React.ReactNode;
}

export default async function Layout({ children }: LayoutProps) {
  const { user } = await validateRequest();

  return (
    <>
      <ProfileHeader user={user} />
      <main className='page-container'>{children}</main>
    </>
  );
}
