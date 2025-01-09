import { Bookmark } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { ProtectedDrawer } from '@/src/entities/session/server';
import HeaderIconButton from '@/src/shared/ui/app-header-icon-button';

import { SaveButton } from './action';

interface SaveRecipeActionProps {
  recipeId: number;
  isSaved: boolean;
}

function SaveRecipeAction({ isSaved, recipeId }: SaveRecipeActionProps) {
  const t = useTranslations('RecipeDetailsPage.Save');

  return (
    <ProtectedDrawer
      title={t('requireAuthTitle')}
      description={t('requireAuthText')}
      renderTrigger={() => <HeaderIconButton Icon={<Bookmark />} />}
    >
      <SaveButton isSaved={isSaved} recipeId={recipeId} />
    </ProtectedDrawer>
  );
}

export { SaveRecipeAction };
