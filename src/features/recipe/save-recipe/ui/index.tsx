import { Bookmark } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { ProtectedDrawer } from '@/src/entities/session/server';
import HeaderIconButton from '@/src/shared/ui/app-header-icon-button';
import { Button } from '@/src/shared/ui/button';

import { SaveButton } from './action';
import { SaveLabeledButton } from './labeled-action';

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

function SaveRecipeButton({ isSaved, recipeId }: SaveRecipeActionProps) {
  const t = useTranslations('RecipeDetailsPage.Save');

  return (
    <ProtectedDrawer
      title={t('requireAuthTitle')}
      description={t('requireAuthText')}
      renderTrigger={() => (
        <Button className='w-full gap-x-2 px-3 text-base' variant='outline' size='lg'>
          <Bookmark className='h-5 w-5' /> {t('save')}
        </Button>
      )}
    >
      <SaveLabeledButton isSaved={isSaved} recipeId={recipeId} />
    </ProtectedDrawer>
  );
}

export { SaveRecipeAction, SaveRecipeButton };
