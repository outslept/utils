/**
 * Splits an array into chunks of specified size.
 *
 * @example
 * chunk([1, 2, 3, 4, 5], 2);
 * // Result: [[1, 2], [3, 4], [5]]
 *
 * @template T - Type of array elements
 * @param arr - Array to chunk
 * @param size - Size of each chunk
 * @returns Array of chunks
 */
export function chunk<T>(arr: T[], size: number): T[][] {
  return Array.from(
    { length: Math.ceil(arr.length / size) },
    (_, i) => arr.slice(i * size, i * size + size),
  )
}
