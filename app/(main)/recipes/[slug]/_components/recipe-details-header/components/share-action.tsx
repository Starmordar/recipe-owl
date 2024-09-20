'use client';

import { Share2 } from 'lucide-react';

import HeaderIconButton from '@/components/layout/app-header/components/icon-button';
import { webShareData } from '@/config/share';
import useWebShare from '@/hooks/useWebShare';

function ShareAction() {
  const { handleShare } = useWebShare({ data: webShareData });

  return <HeaderIconButton Icon={<Share2 />} onClick={handleShare} />;
}

export default ShareAction;
