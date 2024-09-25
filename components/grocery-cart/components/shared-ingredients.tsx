'use client';

import EditSharedIngredietDrawer from '@/components/edit-shared-ingredient-drawer';

import mergeIngredients from '../utils/mergeIngredients';

import RecipeCardIngredients from './recipe-card-ingrediets';
import RemoveIngredient from './remove-ingredient';
import SharedIngredientsHeader from './shared-ingredients-header';

import type { SharedIngredient } from '@/lib/data/cart';

interface SharedIngredientsProps {
  ingredients: Array<SharedIngredient>;
  cartId: number;
}

function SharedIngredients({ cartId, ingredients }: SharedIngredientsProps) {
  if (ingredients.length === 0) return null;

  return (
    <div className='flex flex-col gap-y-2 pb-4 pt-4 first:pt-0 last:pb-0'>
      <div className='flex gap-4'>
        <SharedIngredientsHeader />
      </div>

      <div className='grid gap-2'>
        <RecipeCardIngredients<SharedIngredient>
          ingredients={ingredients}
          renderContent={(item: SharedIngredient) => (
            <>
              <EditSharedIngredietDrawer item={item}>
                <div className='flex flex-col grow'>
                  <p className='font-medium leading-none'>{item.name}</p>
                  {mergeIngredients(item).map((unit, i) => (
                    <p key={i} className='text-sm text-muted-foreground'>
                      {unit}
                    </p>
                  ))}
                </div>
              </EditSharedIngredietDrawer>

              <RemoveIngredient
                cartId={cartId}
                recipeIds={item.ingredients.map(i => i.recipeId)}
                ingredientIds={item.ingredients.map(i => i.id)}
              />
            </>
          )}
        />
      </div>
    </div>
  );
}

export default SharedIngredients;
