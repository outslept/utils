/**
 * Checks if a value is not null.
 *
 * @example
 * const items = [1, null, 2].filter(noNull); // [1, 2]
 *
 * @template T - The type to check
 * @param v - Value to check
 * @returns True if value is not null
 */
export function noNull<T>(v: T | null): v is Exclude<T, null> {
  return v !== null
}
