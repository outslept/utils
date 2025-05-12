import { getTypeName } from '../base/getTypeName'

/**
 * Asserts that a value satisfies a type guard, throwing an error if it doesn't.
 *
 * @example
 * function processString(s: unknown) {
 *   assertType(s, isString);
 *   // TypeScript now knows s is a string
 *   return s.toUpperCase();
 * }
 *
 * @template T - The expected type
 * @param value - Value to check
 * @param guard - Type guard function
 * @throws TypeError if the value doesn't satisfy the type guard
 */
export function assertType<T>(value: unknown, guard: (v: unknown) => v is T): asserts value is T {
  if (!guard(value)) {
    throw new TypeError(`Expected ${getTypeName(value)} to satisfy type guard`)
  }
}
