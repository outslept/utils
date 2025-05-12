/**
 * Creates a type guard for values that satisfy any of the provided type guards.
 *
 * @example
 * const isStringOrNumber = isUnion(isString, (v): v is number => typeof v === 'number');
 * isStringOrNumber('hello');  // true
 * isStringOrNumber(42);       // true
 * isStringOrNumber(true);     // false
 *
 * @template T - Array of type guard functions
 * @param guards - Type guard functions to check
 * @returns Type guard function that passes if any of the provided guards pass
 */
export function isUnion<T extends readonly ((v: unknown) => boolean)[]>(
  ...guards: T
): (v: unknown) => v is ReturnType<T[number]> {
  return (v: unknown): v is any => guards.some(guard => guard(v))
}
