import type { Recipe } from '@/types/recipe';

interface MethodProps {
  recipe: Recipe;
}

export default function RecipeMethod({ recipe }: MethodProps) {
  return (
    <div className="flex flex-col gap-5">
      {recipe.instructions.map((instruction, index) => {
        return (
          <div className="flex items-start">
            <div className="min-w-10 w-10 pt-1 pl-1">
              <div className="flex justify-center items-center bg-primary opacity-80 w-[22px] h-[22px] rounded-full text-primary-foreground text-sm">
                <span>{index + 1}</span>
              </div>
            </div>

            <p>{instruction}</p>
          </div>
        );
      })}
    </div>
  );
}
