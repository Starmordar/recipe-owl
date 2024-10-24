'use client';

import { Share2 } from 'lucide-react';

import useWebShare from '@/shared/hooks/useWebShare';
import HeaderIconButton from '@/shared/ui/app-header-icon-button';

import { recipeShareInfo } from '../config/share-info';

function ShareRecipe() {
  const { shareContent } = useWebShare({ shareData: recipeShareInfo });
  return <HeaderIconButton Icon={<Share2 />} onClick={() => shareContent()} />;
}

export { ShareRecipe };
