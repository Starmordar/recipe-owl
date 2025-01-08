import { Button } from '@/src/shared/ui/button';
import { UserAvatar } from '@/src/shared/ui/user-avatar';

import type { User } from 'lucia';

interface ProfileStatsProps {
  user: User;
}

async function ProfileStats({ user }: ProfileStatsProps) {
  return (
    <div className='flex justify-self-start px-4 pb-2'>
      <div className='flex gap-x-3 items-center'>
        <UserAvatar src={user.picture} height={92} width={92} />

        <div className='flex flex-col gap-y-2 self-start'>
          <span className='text-xl font-bold'>{user.fullName}</span>
          <div className='flex gap-x-3'>
            <p className='font-medium'>
              <span className='font-bold'>0</span> Following
            </p>
            <p className='font-medium'>
              <span className='font-bold'>0</span> Followers
            </p>
          </div>

          <Button className='self-start' size='xss' variant='outline'>
            Edit Profile
          </Button>
        </div>
      </div>
    </div>
  );
}

export { ProfileStats };
