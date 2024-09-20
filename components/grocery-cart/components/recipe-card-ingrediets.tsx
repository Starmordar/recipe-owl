'use client';

import { motion, AnimatePresence } from 'framer-motion';

import { applyQuantityToUnit } from '../utils/applyQuantityToUnit';

import RemoveIngredient from './remove-ingredient';

import type { CartRecipe } from '@/lib/data/cart';

interface RecipeCardProps {
  recipe: NonNullable<CartRecipe['recipe']>;
  ingredients: NonNullable<CartRecipe['ingredients']>;
  quantity: number;
}

function RecipeCardIngredients({ recipe, ingredients, quantity }: RecipeCardProps) {
  return (
    <motion.div>
      <AnimatePresence>
        {ingredients.map(ingredient => {
          if (ingredient === null) return null;

          return (
            <motion.div
              key={ingredient.name}
              initial={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              layout
              className='flex w-full justify-between py-2 border-b'
            >
              <div>
                <p className='text-sm font-medium leading-none'>{ingredient.name}</p>
                <p className='text-sm text-muted-foreground'>
                  {applyQuantityToUnit(ingredient.unit, quantity)}
                </p>
              </div>

              <RemoveIngredient recipeId={recipe.id} ingredientId={ingredient.id} />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </motion.div>
  );
}

export default RecipeCardIngredients;
