type GroupByResult<K extends PropertyKey, T> = Partial<Record<K, Array<T>>>;

function groupBy<K extends PropertyKey, T>(
  arr: Array<T>,
  keySelector: (item: T) => K,
): GroupByResult<K, T> {
  return arr.reduce<GroupByResult<K, T>>((result, item) => {
    const key = keySelector(item);

    if (!result[key]) result[key] = [];
    result[key].push(item);

    return result;
  }, {});
}

export default groupBy;
