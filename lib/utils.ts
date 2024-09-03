import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: Array<ClassValue>) {
  return twMerge(clsx(inputs));
}

export function groupBy<K extends PropertyKey, T>(
  arr: Array<T>,
  keySelector: (item: T) => K,
): Partial<Record<K, Array<T>>> {
  return arr.reduce<Partial<Record<K, Array<T>>>>((result, item) => {
    const key = keySelector(item);

    if (!result[key]) result[key] = [];
    result[key].push(item);

    return result;
  }, {});
}
