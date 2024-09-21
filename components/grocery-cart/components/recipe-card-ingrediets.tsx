'use client';

import { motion, AnimatePresence } from 'framer-motion';

import type { ReactNode } from 'react';

interface RecipeCardProps<Ingredient extends { name: string }> {
  ingredients: Array<Ingredient>;
  renderContent: (ingredient: Ingredient) => ReactNode;
}

function RecipeCardIngredients<Ingredient extends { name: string }>({
  renderContent,
  ingredients,
}: RecipeCardProps<Ingredient>) {
  if (ingredients.length === 0)
    return (
      <div className='text-center mt-4'>
        <p>Ingredients Included in Shared Section</p>
      </div>
    );

  return (
    <div>
      <AnimatePresence>
        {ingredients.map(ingredient => {
          if (ingredient === null) return null;

          return (
            <motion.div
              key={ingredient.name}
              className='flex w-full justify-between py-2 border-b'
              initial={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              layout
            >
              {renderContent(ingredient)}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

export default RecipeCardIngredients;
