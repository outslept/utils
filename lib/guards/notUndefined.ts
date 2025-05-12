/**
 * Checks if a value is not undefined.
 *
 * @example
 * const items = [1, undefined, 2].filter(notUndefined); // [1, 2]
 *
 * @template T - The type to check
 * @param v - Value to check
 * @returns True if value is not undefined
 */
export function notUndefined<T>(v: T): v is Exclude<T, undefined> {
  return v !== undefined
}
