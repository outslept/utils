/**
 * Groups array elements by a key derived from each element.
 *
 * @example
 * const people = [
 *   { age: 30, name: 'John' },
 *   { age: 25, name: 'Jane' },
 *   { age: 30, name: 'Bob' }
 * ];
 *
 * groupBy(people, p => p.age);
 * // Result: { 25: [{age: 25, name: 'Jane'}], 30: [{age: 30, name: 'John'}, {age: 30, name: 'Bob'}] }
 *
 * @template T - Type of array elements
 * @template K - Type of keys (must be valid object property key)
 * @param arr - Array to group
 * @param keySelector - Function to extract the grouping key from an element
 * @returns Object with keys as group identifiers and values as arrays of matching elements
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
