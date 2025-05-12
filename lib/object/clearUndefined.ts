/**
 * Removes all properties with undefined values from an object.
 * Modifies the original object.
 *
 * @example
 * clearUndefined({ a: 1, b: undefined, c: 3 }); // { a: 1, c: 3 }
 *
 * @template T - Object type
 * @param obj - Object to modify
 * @returns The same object with undefined properties removed
 */
export function clearUndefined<T extends object>(obj: T): T {
  // @ts-expect-error -- ignore
  Object.keys(obj).forEach((key: string) => (obj[key] === undefined ? delete obj[key] : {}))
  return obj
}
