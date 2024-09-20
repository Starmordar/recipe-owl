'use client';

import { EllipsisVertical } from 'lucide-react';

import HeaderIconButton from '@/components/layout/app-header/components/icon-button';
import RecipeActionsDrawer from '@/components/recipe-actions-drawer';

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
