'use client';

import { Share2 } from 'lucide-react';

import HeaderIconButton from '@/components/layout/app-header/components/icon-button';
import { webShareData } from '@/config/share';
import useWebShare from '@/shared/hooks/useWebShare';

function ShareAction() {
  const { shareContent } = useWebShare({ shareData: webShareData });
  return <HeaderIconButton Icon={<Share2 />} onClick={() => shareContent()} />;
}

export default ShareAction;
