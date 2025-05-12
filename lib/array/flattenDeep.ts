/**
 * Recursively flattens a nested array structure.
 *
 * @example
 * flattenDeep([1, [2, [3, 4], 5]]);
 * // Result: [1, 2, 3, 4, 5]
 *
 * @template T - Type of the flattened array elements
 * @param arr - Nested array to flatten
 * @returns Flattened array
 */
export function flattenDeep<T>(arr: any[]): T[] {
  return arr.reduce(
    (acc, val) => acc.concat(Array.isArray(val) ? flattenDeep(val) : [val]),
    [] as T[],
  )
}
