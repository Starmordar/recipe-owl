'use client';

import { Share2 } from 'lucide-react';

import useWebShare from '@/shared/hooks/useWebShare';
import HeaderIconButton from '@/shared/ui/app-header-icon-button';

const webShareData = {
  title: 'Recipe OWL: Discover, Cook, Share – The Wise Way',
};

function ShareAction() {
  const { shareContent } = useWebShare({ shareData: webShareData });
  return <HeaderIconButton Icon={<Share2 />} onClick={() => shareContent()} />;
}

export default ShareAction;
