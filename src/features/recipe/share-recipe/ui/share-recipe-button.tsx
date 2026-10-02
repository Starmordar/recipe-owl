'use client';

import { Share2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { publicUrls } from '@/src/shared/config/url';
import { useWebShare } from '@/src/shared/lib/use-web-share';
import { Button } from '@/src/shared/ui/button';

import { getShareInfo } from '../config/share-info';

interface ShareRecipeButtonProps {
  recipeId: number;
}

function ShareRecipeButton({ recipeId }: ShareRecipeButtonProps) {
  const t = useTranslations('RecipeDetailsPage.ShareRecipe');
  const { shareContent } = useWebShare({ shareData: getShareInfo(t) });

  return (
    <Button
      className='w-full gap-x-2 px-3 text-base'
      variant='outline'
      size='lg'
      onClick={() => shareContent(publicUrls.recipe(recipeId))}
    >
      <Share2 className='h-5 w-5' /> {t('share')}
    </Button>
  );
}

export { ShareRecipeButton };
