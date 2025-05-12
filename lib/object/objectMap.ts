/**
 * Maps an object by applying a transformation function to each key-value pair.
 * The transformation function can return a new key-value pair or undefined to exclude an entry.
 *
 * @example
 * objectMap({ a: 1, b: 2 }, (key, value) => [key.toUpperCase(), value * 2]);
 * // Result: { A: 2, B: 4 }
 *
 * @template K - Type of source object keys
 * @template V - Type of source object values
 * @template NK - Type of target object keys
 * @template NV - Type of target object values
 * @param obj - Source object to transform
 * @param fn - Transformation function that receives key and value and returns new [key, value] pair or undefined
 * @returns New object with transformed keys and values
 * @throws Error if the transformation results in duplicate keys
 */
export function objectMap<
  K extends PropertyKey,
  V,
  NK extends PropertyKey,
  NV,
>(
  obj: Record<K, V>,
  fn: (key: K, value: V) => [NK, NV] | undefined,
): Record<NK, NV> {
  const entries = Object.entries(obj) as [K, V][]

  const mappedEntries = entries
    .map(([key, value]) => fn(key, value))
    .filter((entry): entry is [NK, NV] => entry !== undefined)

  const keys = new Set(mappedEntries.map(([k]) => k))
  if (keys.size !== mappedEntries.length) {
    throw new Error('Duplicate keys detected in mapped object')
  }

  return mappedEntries.reduce((acc, [key, value]) => {
    acc[key] = value
    return acc
  }, {} as Record<NK, NV>)
}
