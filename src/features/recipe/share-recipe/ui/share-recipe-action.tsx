'use client';

import { Share2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { publicUrls } from '@/src/shared/config/url';
import { useWebShare } from '@/src/shared/lib/use-web-share';
import HeaderIconButton from '@/src/shared/ui/app-header-icon-button';

import { getShareInfo } from '../config/share-info';

interface ShareRecipeActionProps {
  recipeId: number;
}

function ShareRecipeAction({ recipeId }: ShareRecipeActionProps) {
  const t = useTranslations('RecipeDetailsPage.ShareRecipe');
  const { shareContent } = useWebShare({ shareData: getShareInfo(t) });

  return (
    <HeaderIconButton
      className='lg:gap-x-2 lg:px-3'
      Icon={<Share2 />}
      onClick={() => shareContent(publicUrls.recipe(recipeId))}
    >
      <span className='sr-only lg:not-sr-only'>{t('share')}</span>
    </HeaderIconButton>
  );
}

export { ShareRecipeAction };
