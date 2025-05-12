/**
 * Returns the first n elements from an array.
 *
 * @example
 * take([1, 2, 3, 4, 5], 3);
 * // Result: [1, 2, 3]
 *
 * @template T - Type of array elements
 * @param arr - Source array
 * @param size - Number of elements to take
 * @returns New array with the first n elements
 */
export function take<T>(arr: T[], size: number): T[] {
  return arr.slice(0, size)
}
