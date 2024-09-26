'use client';

import type { ReactNode } from 'react';

interface Ingredient {
  id?: number;
  name?: string;
}
interface IngredientsSectionProps<I extends Ingredient> {
  ingredients: Array<I>;
  renderContent: (ingredient: I) => ReactNode;
  checked: boolean;
}

function IngredientsSection<I extends Ingredient>({
  renderContent,
  ingredients,
  checked,
}: IngredientsSectionProps<I>) {
  return (
    <div className={checked ? 'opacity-40' : 'opacity-100'}>
      {ingredients.map(ingredient => {
        if (ingredient === null) return null;

        return (
          <div
            key={ingredient.id ?? ingredient.name}
            className='flex w-full justify-between py-2.5 border-b text-base'
          >
            {renderContent(ingredient)}
          </div>
        );
      })}
    </div>
  );
}

export default IngredientsSection;
