'use client';

import { Share2 } from 'lucide-react';

import useWebShare from '@/src/shared/lib/use-web-share';
import HeaderIconButton from '@/src/shared/ui/app-header-icon-button';

import { shareInfo } from '../config/share-info';

function ShareRecipeAction() {
  const { shareContent } = useWebShare({ shareData: shareInfo });
  return <HeaderIconButton Icon={<Share2 />} onClick={() => shareContent()} />;
}

export { ShareRecipeAction };
