'use client';

import { EllipsisVertical } from 'lucide-react';

import RecipeActionsDrawer from '@/components/recipe-actions-drawer';
import HeaderIconButton from '@/shared/ui/app-header-icon-button';

interface MoreOptionsActionProps {
  recipeId: number;
}

function MoreOptionsAction({ recipeId }: MoreOptionsActionProps) {
  return (
    <RecipeActionsDrawer recipeId={recipeId}>
      <HeaderIconButton Icon={<EllipsisVertical />} />
    </RecipeActionsDrawer>
  );
}

export default MoreOptionsAction;
