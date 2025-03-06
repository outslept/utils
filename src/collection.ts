/**
 * Groups array elements by key selector
 * @param arr - Target array
 * @param keySelector  - Key Selector function
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

/**
 * Creates array of unique values
 * @param arr - Target array
 * @param by - Key selector for complex objects
 */
export function uniq<T>(arr: T[], by?: (item: T) => unknown): T[] {
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
 * Creates arrayu chunked into groups of specified size
 * @param arr - Target array
 * @param size - Chunk size
 */
export function chunk<T>(arr: T[], size: number): T[][] {
  return Array.from(
    { length: Math.ceil(arr.length / size) },
    (_, i) => arr.slice(i * size, i * size + size),
  )
}

/**
 * Zips multiple arrays into arrays of tuples
 * @param arrays - Arrays to zip
 */
export function zip<T extends unknown[][]>(...arrays: T): { [K in keyof T]: T[K] extends (infer V)[] ? V : never }[] {
  const maxLength = Math.max(...arrays.map(a => a.length))
  return Array.from(
    { length: maxLength },
    (_, i) => arrays.map(a => a[i]) as any,
  )
}

/**
 * Creates frequency map from array elements
 * @param arr - Target array
 * @param keyFn - Key generator function
 */
export function frequency<T>(arr: T[], keyFn: (item: T) => string = String): Record<string, number> {
  return arr.reduce((acc, item) => {
    const key = keyFn(item)
    acc[key] = (acc[key] || 0) + 1
    return acc
  }, {} as Record<string, number>)
}

/**
 * Flattens array recursively
 * @param arr - Target array
 */
export function flattenDeep<T>(arr: any[]): T[] {
  return arr.reduce(
    (acc, val) => acc.concat(Array.isArray(val) ? flattenDeep(val) : [val]),
    [] as T[],
  )
}

/**
 * Creates an array of elements split into groups by size
 * @param arr - Target array
 * @param size - Size of each group
 */
export function take<T>(arr: T[], size: number): T[] {
  return arr.slice(0, size)
}

/**
 * Partitions array into two ararys based on predicate
 * @param arr - Target array
 * @param predicate - Predicate function
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

/**
 * Creates an array of values from all arrays without duplicates
 * @param arrays - Arrays to union
 */
export function union<T>(...arrays: T[][]): T[] {
  return [...new Set(arrays.flat())]
}

export function shuffle<T>(array: T[]): T[] {
  const result = [...array]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]]
  }
  return result
}
