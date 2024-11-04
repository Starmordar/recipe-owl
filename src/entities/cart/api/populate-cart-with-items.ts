import groupBy from '@/src/shared/lib/groupBy';

import type { CartDetails, CartWithRecipes } from '../model/types';

function populateCartWithItems(cart: CartDetails): CartWithRecipes {
  const checked = getCheckedIngredients(cart);
  const checkedIds = new Set(checked.map(item => item.id));
  const uncheckedItems = cart.items.filter(item => !checkedIds.has(item.id));

  const shared = getSharedIngredients(uncheckedItems);
  const items = getCartRepiceItems(uncheckedItems, shared);

  return { cart, shared, checked, items };
}

function getCheckedIngredients(cart: CartDetails): CartWithRecipes['checked'] {
  return cart.items.filter(item => item.isChecked);
}

function getSharedIngredients(items: CartDetails['items']): CartWithRecipes['shared'] {
  const groupedByName = groupBy(items, ({ ingredient }) => ingredient.name);

  return Object.entries(groupedByName).flatMap(([name, data]) => {
    if (!data || data?.length === 1) return [];

    return {
      name,
      ingredients: data.map(
        ({ id, recipeId, ingredient: { id: ingredientId, unit }, quantity, recipe }) => ({
          itemId: id,
          id: ingredientId,
          recipeId,
          recipe,
          unit,
          quantity,
        }),
      ),
    };
  });
}

function getCartRepiceItems(
  items: CartDetails['items'],
  shared: CartWithRecipes['shared'],
): CartWithRecipes['items'] {
  const sharedNames = new Set(shared.map(s => s.name));
  const groupedItems = groupBy(items, ({ recipe }) => recipe.id);

  return Object.entries(groupedItems).flatMap(([recipeId, data]) => {
    if (!data) return [];

    return {
      recipe: data[0].recipe,
      ingredients: data
        .map(i => ({ ...i.ingredient, itemId: i.id }))
        .filter(({ name }) => !sharedNames.has(name)),
      quantity: data[0].quantity,
    };
  });
}

export { populateCartWithItems };
