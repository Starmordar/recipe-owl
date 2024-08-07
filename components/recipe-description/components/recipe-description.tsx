import type { Recipe } from '@/types/recipe';

const text =
  'Cinnamon rolls and apple pie filling is an almost 2 ingredient cinnamon roll bake filled with warm apple pie sauce and chunks of sweet apples. This quick and easy apple pie cinnamon roll cobbler makes the perfect weekend treat or a special holiday breakfast or dessert.';

interface RecipeDescriptionProps {
  recipe: Recipe;
}

export default function RecipeDescription({ recipe }: RecipeDescriptionProps) {
  console.log('recipe :>> ', recipe);

  return (
    <div className="mb-4">
      <h1 className="text-xl font-bold mb-1">{recipe.name}</h1>
      <p className="text-sm leading-5">{text}</p>
    </div>
  );
}
