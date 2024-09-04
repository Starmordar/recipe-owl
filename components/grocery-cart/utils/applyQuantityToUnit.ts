export function applyQuantityToUnit(unit: string | null, quantity: number): string {
  if (unit === null) return '';
  return replaceValuesWithMultipliedValue(unit, quantity);
}

function parseFractionOrNumberToFloat(value: string): number | null {
  if (value.includes('/')) {
    const [numerator, denominator] = value.split('/').map(Number);

    if (isNaN(numerator) || isNaN(denominator) || denominator === 0) return null;
    return numerator / denominator;
  }

  const number = parseFloat(value);
  if (!isNaN(number)) return number;
  return null;
}

function replaceValuesWithMultipliedValue(str: string, quantity: number): string {
  return str.replace(/(\d+\/\d+|\d+(\.\d+)?)/g, match => {
    const value = parseFractionOrNumberToFloat(match);

    if (value !== null) return (value * quantity).toString();
    return `2 x ${match}`;
  });
}
