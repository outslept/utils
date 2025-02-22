/**
 * Groups array elements by key selector
 * @param arr - Target array
 * @param keySelector  - Key Selector function
 */
export function groupBy<T, K extends PropertyKey>(
  arr: T[],
  keySelector: (item: T) => K,
): Record<K, T[]> {
  return arr.reduce((acc, item) => {
    const key = keySelector(item)
    acc[key] = [...(acc[key] || []), item]
    return acc
  }, {} as Record<K, T[]>)
}

/**
 * Creates array of unique values
 * @param arr - Target array
 * @param by - Key selector for complex objects
 */
export function uniq<T>(arr: T[], by?: (item: T) => unknown): T[] {
  const seen = new Set<unknown>()

  return arr.filter((item) => {
    const key = by ? by(item) : item
    if (seen.has(key))
      return false
    seen.add(key)
    return true
  })
}
