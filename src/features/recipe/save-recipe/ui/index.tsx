import { Bookmark } from 'lucide-react';

import { ProtectedDrawer } from '@/src/entities/session/server';
import HeaderIconButton from '@/src/shared/ui/app-header-icon-button';

import { SaveButton } from './action';

interface SaveRecipeActionProps {
  recipeId: number;
  isSaved: boolean;
}

function SaveRecipeAction({ isSaved, recipeId }: SaveRecipeActionProps) {
  return (
    <ProtectedDrawer
      title='Log In to Save'
      description='To save your recipes, please log in or create a new account.'
      renderTrigger={() => <HeaderIconButton Icon={<Bookmark />} />}
    >
      <SaveButton isSaved={isSaved} recipeId={recipeId} />
    </ProtectedDrawer>
  );
}

export { SaveRecipeAction };
