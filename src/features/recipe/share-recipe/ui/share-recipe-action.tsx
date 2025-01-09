'use client';

import { Share2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { useWebShare } from '@/src/shared/lib/use-web-share';
import HeaderIconButton from '@/src/shared/ui/app-header-icon-button';

import { getShareInfo } from '../config/share-info';

function ShareRecipeAction() {
  const t = useTranslations('RecipeDetailsPage.ShareRecipe');
  const { shareContent } = useWebShare({ shareData: getShareInfo(t) });
  return <HeaderIconButton Icon={<Share2 />} onClick={() => shareContent()} />;
}

export { ShareRecipeAction };
