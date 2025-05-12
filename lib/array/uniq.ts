/**
 * Creates an array of unique values, optionally based on a key selector for complex objects.
 *
 * @example
 * uniq([1, 2, 2, 3, 1]);
 * // Result: [1, 2, 3]
 *
 * const users = [
 *   { id: 1, name: 'John' },
 *   { id: 2, name: 'Jane' },
 *   { id: 1, name: 'John (duplicate)' }
 * ];
 * uniq(users, u => u.id);
 * // Result: [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }]
 *
 * @template T - Type of array elements
 * @param arr - Array to process
 * @param by - Optional function to extract a uniqueness key from each element
 * @returns New array with only unique elements
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
