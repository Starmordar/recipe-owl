'use client';

import { Share2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { publicUrls } from '@/src/shared/config/url';
import { useWebShare } from '@/src/shared/lib/use-web-share';
import HeaderIconButton from '@/src/shared/ui/app-header-icon-button';

import { profileShareInfo } from '../../config/share-info';

import type { User } from 'lucia';

interface ShareProfileProps {
  user: User;
}

function ShareProfile({ user }: ShareProfileProps) {
  const t = useTranslations('ProfilePage.ShareProfile');
  const { shareContent } = useWebShare({ shareData: profileShareInfo(user, t) });

  return <HeaderIconButton Icon={<Share2 />} onClick={() => shareContent(publicUrls.profile)} />;
}

export { ShareProfile };
