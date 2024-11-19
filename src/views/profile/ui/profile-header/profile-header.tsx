import { Settings } from 'lucide-react';

import AppHeader from '@/src/shared/ui/app-header';
import HeaderIconButton from '@/src/shared/ui/app-header-icon-button';
import { UserAvatar } from '@/src/shared/ui/user-avatar';

import { ShareProfile } from './share-profile';

import type { User } from 'lucia';

interface ProfileHeaderProps {
  user: User | null;
}

function ProfileHeader({ user }: ProfileHeaderProps) {
  if (!user) return null;

  return (
    <AppHeader>
      <div className='flex gap-x-3 items-center'>
        <UserAvatar src={user.picture} height={36} width={36} />
        <span className='text-lg font-semibold'>{user.fullName}</span>
      </div>
      <div className='flex gap-x-3'>
        <ShareProfile user={user} />
        <HeaderIconButton Icon={<Settings />} />
      </div>
    </AppHeader>
  );
}

export { ProfileHeader };
