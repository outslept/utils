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
function groupBy<T, K extends PropertyKey>(
  arr: T[],
  keySelector: (item: T) => K,
): Record<K, T[]> {
  return arr.reduce((acc, item) => {
    const key = keySelector(item)
    acc[key] = [...(acc[key] || []), item]
    return acc
  }, {} as Record<K, T[]>)
}

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
function uniq<T>(arr: T[], by?: (item: T) => unknown): T[] {
  const seen = new Set<unknown>()

  return arr.filter((item) => {
    const key = by ? by(item) : item
    if (seen.has(key))
      return false
    seen.add(key)
    return true
  })
}

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
function chunk<T>(arr: T[], size: number): T[][] {
  return Array.from(
    { length: Math.ceil(arr.length / size) },
    (_, i) => arr.slice(i * size, i * size + size),
  )
}

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
function zip<T extends unknown[][]>(...arrays: T): { [K in keyof T]: T[K] extends (infer V)[] ? V : never }[] {
  const maxLength = Math.max(...arrays.map(a => a.length))
  return Array.from(
    { length: maxLength },
    (_, i) => arrays.map(a => a[i]) as any,
  )
}

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
function frequency<T>(arr: T[], keyFn: (item: T) => string = String): Record<string, number> {
  return arr.reduce((acc, item) => {
    const key = keyFn(item)
    acc[key] = (acc[key] || 0) + 1
    return acc
  }, {} as Record<string, number>)
}

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
function flattenDeep<T>(arr: any[]): T[] {
  return arr.reduce(
    (acc, val) => acc.concat(Array.isArray(val) ? flattenDeep(val) : [val]),
    [] as T[],
  )
}

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
function take<T>(arr: T[], size: number): T[] {
  return arr.slice(0, size)
}

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
function partition<T>(
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
function union<T>(...arrays: T[][]): T[] {
  return [...new Set(arrays.flat())]
}

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
function shuffle<T>(array: T[]): T[] {
  const result = [...array]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

export {
  chunk,
  flattenDeep,
  frequency,
  groupBy,
  partition,
  shuffle,
  take,
  union,
  uniq,
  zip,
}
