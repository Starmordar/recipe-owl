import { EllipsisVertical } from 'lucide-react';
import { headers } from 'next/headers';

import { isRecipeSaved, SaveRecipeAction } from '@/src/features/recipe/save-recipe';
import { ShareRecipeAction } from '@/src/features/recipe/share-recipe';
import { validateRequest } from '@/src/shared/api/auth';
import { publicUrls } from '@/src/shared/config/url';
import { cn } from '@/src/shared/lib/classnames';
import { AppBackButton } from '@/src/shared/ui/app-back-button';
import HeaderIconButton from '@/src/shared/ui/app-header-icon-button';
import { RecipeActionsDrawer } from '@/src/widgets/recipe-actions-drawer';

import type { RecipeDetails } from '@/src/entities/recipe';

// The header floats over the recipe image, so every button gets its own backdrop.
const floatingButtons = cn(
  '[&_button]:pointer-events-auto [&_button]:h-9 [&_button]:w-9 [&_button]:rounded-full',
  '[&_svg]:h-5 [&_svg]:w-5',
  '[&_button]:bg-background/90 [&_button]:shadow-sm [&_button]:ring-1 [&_button]:ring-border [&_button]:backdrop-blur',
);

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
    <header className='sticky top-0 z-50 -mb-14 h-14 w-full pointer-events-none'>
      <div className={cn('container flex h-full items-center justify-between', floatingButtons)}>
        <AppBackButton goBack={!!referer} fallbackUrl={publicUrls.recipes} />

        <div className='flex gap-x-2'>
          <SaveRecipeAction recipeId={recipe.id} isSaved={isSaved} />
          <ShareRecipeAction recipeId={recipe.id} />

          {isCurrentUserOwner && (
            <RecipeActionsDrawer recipeId={recipe.id}>
              <HeaderIconButton Icon={<EllipsisVertical />} />
            </RecipeActionsDrawer>
          )}
        </div>
      </div>
    </header>
  );
}

export { RecipeDetailsHeader };
