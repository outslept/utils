/**
 * Creates a new object with only the specified keys from the source object.
 *
 * @example
 * objectPick({ a: 1, b: 2, c: undefined }, ['a', 'c']); // { a: 1, c: undefined }
 * objectPick({ a: 1, b: 2, c: undefined }, ['a', 'c'], true); // { a: 1 }
 *
 * @template O - Source object type
 * @template T - Union of keys to pick
 * @param obj - Source object
 * @param keys - Array of keys to include in the result
 * @param omitUndefined - If true, properties with undefined values will be excluded
 * @returns New object with only the specified keys
 */
export function objectPick<O extends object, T extends keyof O>(obj: O, keys: T[], omitUndefined = false): Pick<O, T> {
  return keys.reduce((n, k) => {
    if (k in obj) {
      if (!omitUndefined || obj[k] !== undefined)
        n[k] = obj[k]
    }
    return n
  }, {} as Pick<O, T>)
}
