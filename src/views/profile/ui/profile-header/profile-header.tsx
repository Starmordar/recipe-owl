import { Settings } from 'lucide-react';

import AppHeader from '@/src/shared/ui/app-header';
import HeaderIconButton from '@/src/shared/ui/app-header-icon-button';

import { SettingsDrawer } from '../settings-drawer';

import { ShareProfile } from './share-profile';

import type { User } from 'lucia';

interface ProfileHeaderProps {
  user: User | null;
}

function ProfileHeader({ user }: ProfileHeaderProps) {
  if (!user) return null;

  return (
    <AppHeader>
      <div className='flex gap-x-3 items-center'></div>
      <div className='flex gap-x-3'>
        <ShareProfile user={user} />
        <SettingsDrawer>
          <HeaderIconButton Icon={<Settings />} />
        </SettingsDrawer>
      </div>
    </AppHeader>
  );
}

export { ProfileHeader };
