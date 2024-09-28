'use client';

import { motion } from 'framer-motion';

import type { ReactNode } from 'react';

interface Ingredient {
  id?: number;
  name?: string;
}
interface IngredientsSectionProps<I extends Ingredient> {
  ingredients: Array<I>;
  renderContent: (ingredient: I) => ReactNode;
  checked: boolean;
  onClick: (ingredient: I) => void;
}

function IngredientsSection<I extends Ingredient>({
  renderContent,
  ingredients,
  checked,
  onClick,
}: IngredientsSectionProps<I>) {
  return (
    <div className={checked ? 'opacity-40' : 'opacity-100'}>
      {ingredients.map(ingredient => {
        if (ingredient === null) return null;

        return (
          <motion.div
            key={ingredient.id ?? ingredient.name}
            className='flex w-full justify-between py-2.5 border-b text-base'
            onClick={() => onClick(ingredient)}
            layout
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent(ingredient)}
          </motion.div>
        );
      })}
    </div>
  );
}

export default IngredientsSection;
