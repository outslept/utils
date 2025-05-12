/**
 * Checks if a value is truthy.
 *
 * @example
 * const items = [0, 1, '', 'text', false, true].filter(isTruthy); // [1, 'text', true]
 *
 * @template T - The type to check
 * @param v - Value to check
 * @returns True if value is truthy
 */
export function isTruthy<T>(v: T): v is NonNullable<T> {
  return Boolean(v)
}
