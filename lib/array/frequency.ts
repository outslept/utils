/**
 * Creates a frequency map counting occurrences of each element.
 *
 * @example
 * frequency(['a', 'b', 'a', 'c', 'b', 'a']);
 * // Result: { a: 3, b: 2, c: 1 }
 *
 * const users = [{ id: 1 }, { id: 2 }, { id: 1 }];
 * frequency(users, u => `id-${u.id}`);
 * // Result: { 'id-1': 2, 'id-2': 1 }
 *
 * @template T - Type of array elements
 * @param arr - Array to count frequencies in
 * @param keyFn - Function to convert elements to string keys (default: String)
 * @returns Object mapping keys to their frequencies
 */
export function frequency<T>(arr: T[], keyFn: (item: T) => string = String): Record<string, number> {
  return arr.reduce((acc, item) => {
    const key = keyFn(item)
    acc[key] = (acc[key] || 0) + 1
    return acc
  }, {} as Record<string, number>)
}
