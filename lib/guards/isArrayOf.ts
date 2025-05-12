import isArray from "../is/is-array";

/**
 * Creates a type guard for arrays containing elements of a specific type.
 *
 * @example
 * const isStringArray = isArrayOf(isString);
 * isStringArray(['a', 'b', 'c']);  // true
 * isStringArray(['a', 1, 'c']);    // false (contains non-string)
 *
 * @template T - The element type
 * @param guard - Type guard for individual elements
 * @returns Type guard function for arrays of the specified type
 */
export function isArrayOf<T>(guard: (v: unknown) => v is T) {
  return (v: unknown): v is T[] => isArray(v) && v.every(guard)
}
