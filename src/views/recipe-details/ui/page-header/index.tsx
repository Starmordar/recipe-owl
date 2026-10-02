import { EllipsisVertical } from 'lucide-react';
import { headers } from 'next/headers';

import { isRecipeSaved, SaveRecipeAction } from '@/src/features/recipe/save-recipe';
import { ShareRecipeAction } from '@/src/features/recipe/share-recipe';
import { validateRequest } from '@/src/shared/api/auth';
import { publicUrls } from '@/src/shared/config/url';
import { AppBackButton } from '@/src/shared/ui/app-back-button';
import HeaderIconButton from '@/src/shared/ui/app-header-icon-button';
import { RecipeActionsDrawer } from '@/src/widgets/recipe-actions-drawer';

import { HeaderBar } from './header-bar';

import type { RecipeDetails } from '@/src/entities/recipe';

interface RecipeDetailsHeaderProps {
  recipe: RecipeDetails;
}

async function RecipeDetailsHeader({ recipe }: RecipeDetailsHeaderProps) {
  const { user } = await validateRequest();
  const headersList = await headers();
  const referer = headersList.get('referer');

  const isSaved = await isRecipeSaved(user?.id, recipe.id);
  const isCurrentUserOwner = user && user.id === recipe.user.id;

  return (
    <HeaderBar
      title={recipe.title}
      backButton={<AppBackButton goBack={!!referer} fallbackUrl={publicUrls.recipes} />}
    >
      <SaveRecipeAction recipeId={recipe.id} isSaved={isSaved} />
      <ShareRecipeAction recipeId={recipe.id} />

      {isCurrentUserOwner && (
        <RecipeActionsDrawer recipeId={recipe.id}>
          <HeaderIconButton Icon={<EllipsisVertical />} />
        </RecipeActionsDrawer>
      )}
    </HeaderBar>
  );
}

export { RecipeDetailsHeader };
