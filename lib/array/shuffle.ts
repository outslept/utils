/**
 * Randomly shuffles the elements of an array using the Fisher-Yates algorithm.
 *
 * Creates a new array with the same elements in a random order.
 * The original array remains unchanged.
 *
 * @example
 * shuffle([1, 2, 3, 4, 5]);
 * // Possible result: [3, 1, 5, 2, 4]
 *
 * @template T - Type of array elements
 * @param array - Array to shuffle
 * @returns New array with elements randomly reordered
 */
export function shuffle<T>(array: T[]): T[] {
  const result = [...array]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]]
  }
  return result
}
