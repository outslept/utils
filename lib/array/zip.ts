/**
 * Combines multiple arrays into a single array of tuples.
 *
 * Creates a new array of tuples where each tuple contains elements from the input arrays
 * at the corresponding index. If arrays have different lengths, shorter arrays are padded
 * with undefined.
 *
 * @example
 * zip([1, 2], ['a', 'b'], [true, false]);
 * // Result: [[1, 'a', true], [2, 'b', false]]
 *
 * zip([1, 2, 3], ['a', 'b']);
 * // Result: [[1, 'a'], [2, 'b'], [3, undefined]]
 *
 * @template T - Tuple of array types
 * @param arrays - Arrays to zip
 * @returns Array of tuples containing elements from each array at corresponding indices
 */
export function zip<T extends unknown[][]>(...arrays: T): { [K in keyof T]: T[K] extends (infer V)[] ? V : never }[] {
  const maxLength = Math.max(...arrays.map(a => a.length))
  return Array.from(
    { length: maxLength },
    (_, i) => arrays.map(a => a[i]) as any,
  )
}
