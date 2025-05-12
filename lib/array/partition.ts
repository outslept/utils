/**
 * Splits an array into two arrays based on a predicate function.
 *
 * @example
 * partition([1, 2, 3, 4, 5], n => n % 2 === 0);
 * // Result: [[2, 4], [1, 3, 5]]
 *
 * @template T - Type of array elements
 * @param arr - Array to partition
 * @param predicate - Function that returns true for elements in the first partition
 * @returns Tuple of two arrays: [matches, non-matches]
 */
export function partition<T>(
  arr: T[],
  predicate: (item: T) => boolean,
): [T[], T[]] {
  return arr.reduce(
    (result, item) => {
      result[predicate(item) ? 0 : 1].push(item)
      return result
    },
    [[], []] as [T[], T[]],
  )
}
