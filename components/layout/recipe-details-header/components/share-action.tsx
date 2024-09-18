'use client';

import { Share2 } from 'lucide-react';

import useWebShare from '@/hooks/useWebShare';

import HeaderIconButton from '../../app-header/components/icon-button';

function ShareAction() {
  const data = { title: 'RecipeOWL: Discover, Cook, Share – The Wise Way' };

  const { handleShare } = useWebShare({ data });
  return <HeaderIconButton Icon={<Share2 />} onClick={handleShare} />;
}

export default ShareAction;
