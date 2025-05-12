/**
 * Creates an array of unique values from multiple arrays.
 *
 * @example
 * union([1, 2], [2, 3], [3, 4]);
 * // Result: [1, 2, 3, 4]
 *
 * @template T - Type of array elements
 * @param arrays - Arrays to combine
 * @returns New array with unique values from all input arrays
 */
export function union<T>(...arrays: T[][]): T[] {
  return [...new Set(arrays.flat())]
}
