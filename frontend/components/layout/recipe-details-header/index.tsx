import { Pencil } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { getRecipe } from '@/lib/data';

import ReturnBackBtn from '../components/return-back-btn';


interface RecipeDetailsHeaderProps {
  recipeId: number;
}

export default async function RecipeDetailsHeader({ recipeId }: RecipeDetailsHeaderProps) {
  const recipe = await getRecipe(recipeId);
  if (!recipe) return null;

  return (
    <div className="container flex items-center justify-between pt-2 pb-1 h-12">
      <ReturnBackBtn />

      <p>{recipe?.title}</p>

      <div className="flex items-center gap-3">
        <Link href={`/recipes/${recipe.id}/edit`}>
          <Button variant="ghost" size="xss">
            <Pencil className="h-4 w-4 opacity-50" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
