/**
 * Creates a type guard for optional values (value or undefined).
 *
 * @example
 * const isOptionalString = isOptional(isString);
 * isOptionalString('hello');   // true
 * isOptionalString(undefined); // true
 * isOptionalString(null);      // false (null is not undefined)
 * isOptionalString(123);       // false
 *
 * @template T - The base type
 * @param guard - Type guard for the base type
 * @returns Type guard function that accepts either the base type or undefined
 */
export function isOptional<T>(guard: (v: unknown) => v is T) {
  return (v: unknown): v is T | undefined => v === undefined || guard(v)
}
