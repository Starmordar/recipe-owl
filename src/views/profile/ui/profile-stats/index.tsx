import { useTranslations } from 'next-intl';

import { Button } from '@/src/shared/ui/button';
import { UserAvatar } from '@/src/shared/ui/user-avatar';

import type { User } from 'lucia';

interface ProfileStatsProps {
  user: User;
}

function ProfileStats({ user }: ProfileStatsProps) {
  const t = useTranslations('ProfilePage.Statistic');

  return (
    <section className='flex items-center gap-x-4'>
      <UserAvatar src={user.picture} height={80} width={80} fallbackClassName='h-20 w-20' />

      <div className='flex min-w-0 flex-col gap-y-1'>
        <h1 className='text-xl md:text-2xl font-semibold break-words line-clamp-2'>
          {user.fullName}
        </h1>

        <p className='text-sm text-muted-foreground'>
          <span className='font-semibold text-foreground'>0</span> {t('following')}
          {' · '}
          <span className='font-semibold text-foreground'>0</span> {t('followers')}
        </p>

        <Button className='mt-1 self-start rounded-full' size='xs' variant='outline'>
          {t('editProfileAction')}
        </Button>
      </div>
    </section>
  );
}

export { ProfileStats };
