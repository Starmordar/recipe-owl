import { validateRequest } from '@/app/(auth)/actions';

import ProfileHeader from './_components/profile-header';

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
