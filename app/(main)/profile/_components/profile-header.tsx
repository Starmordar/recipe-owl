import { Settings, EllipsisVertical } from 'lucide-react';
import Image from 'next/image';

import AppHeader from '@/shared/ui/app-header';

import type { User } from 'lucia';

interface ProfileHeaderProps {
  user: User | null;
}

function ProfileHeader({ user }: ProfileHeaderProps) {
  if (!user) return null;

  return (
    <AppHeader>
      <div className='flex items-center gap-x-2'>
        <Image
          className='rounded-full'
          height={28}
          width={28}
          src={user.picture}
          alt='Profile Picture'
        />
        <p>{user.fullName}</p>
      </div>
      <div className='flex gap-x-2'>
        <Settings className='h-5 w-5 opacity-50' />
        <EllipsisVertical className='h-5 w-5 opacity-50' />
      </div>
    </AppHeader>
  );
}

export default ProfileHeader;
