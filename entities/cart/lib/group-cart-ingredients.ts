import { applyQuantityToUnit } from './add-quantity-to-units';

import type { CartSharedIngredient } from '../model/type';

function parseQuantityAndUnit(quantityWithUnit: string) {
  const match = quantityWithUnit.match(/^(\d*\.?\d+|\d+)\s*(\D+)?$/);

  if (!match) return { quantity: null, unit: quantityWithUnit.trim() };
  return { quantity: parseFloat(match[1]), unit: match[2].trim() };
}

function groupCartIngredient(item: CartSharedIngredient): Array<string> {
  const merged = item.ingredients.reduce(
    (result, ingredient) => {
      const quantityWithUnit = applyQuantityToUnit(ingredient.unit, ingredient.quantity);
      const { quantity, unit } = parseQuantityAndUnit(quantityWithUnit);

      if (result[unit]) {
        if (quantity !== null && result[unit].quantity) result[unit].quantity += quantity;
      } else {
        result[unit] = { quantity, unit };
      }

      return result;
    },
    {} as Record<string, { unit: string; quantity: number | null }>,
  );

  return Object.values(merged).map(({ quantity, unit }) =>
    quantity !== null ? `${quantity} ${unit}` : unit,
  );
}

export { groupCartIngredient };
