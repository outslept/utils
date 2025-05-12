/**
 * Checks if a value is not null or undefined.
 *
 * @example
 * const items = [1, null, 2, undefined].filter(notNullish); // [1, 2]
 *
 * @template T - The type to check
 * @param v - Value to check
 * @returns True if value is neither null nor undefined
 */
export function notNullish<T>(v: T | null | undefined): v is NonNullable<T> {
  return v != null
}
