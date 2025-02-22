/**
 * Groups array elements by key selector
 * @param arr - Target array
 * @param keySelector  - Key Selector function
 */
export function groupBy<T, K extends PropertyKey>(
  arr: T[],
  keySelector: (item: T) => K
): Record<K, T[]> {
  return arr.reduce((acc, item) => {
    const key = keySelector(item)
    acc[key] = [...(acc[key] || []), item]
    return acc
  }, {} as Record<K, T[]>)
}
