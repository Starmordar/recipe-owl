'use client';

import { Share2 } from 'lucide-react';

import { webShareData } from '@/config/share';
import useWebShare from '@/shared/hooks/useWebShare';
import HeaderIconButton from '@/shared/ui/app-header-icon-button';

function ShareAction() {
  const { shareContent } = useWebShare({ shareData: webShareData });
  return <HeaderIconButton Icon={<Share2 />} onClick={() => shareContent()} />;
}

export default ShareAction;
