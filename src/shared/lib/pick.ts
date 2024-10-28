function pick<T extends Record<string, unknown>, K extends keyof T>(
  object: T,
  predicates: Array<K>,
): Pick<T, K> {
  const result: Partial<T> = {};

  predicates.forEach(predicate => {
    if (predicate in object) result[predicate] = object[predicate];
  });

  return result as Pick<T, K>;
}

export default pick;
