import { Heart, Share2 } from 'lucide-react';
import ReturnBackBtn from './components/return-back-btn';

import { getRecipe } from '@/lib/data';

interface RecipeDetailsHeaderProps {
  recipeId: number;
}

export default async function RecipeDetailsHeader({ recipeId }: RecipeDetailsHeaderProps) {
  const recipe = await getRecipe(recipeId);
  if (!recipe) return null;

  return (
    <div className="container flex items-center justify-between pt-2 pb-1 h-12">
      <ReturnBackBtn />

      <p>{recipe?.name}</p>

      <div className="flex gap-3">
        <Share2 className="h-4 w-4 opacity-50" />
        <Heart className="h-4 w-4 opacity-50" />
      </div>
    </div>
  );
}
