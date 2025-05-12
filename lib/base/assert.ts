/**
 * Asserts that a condition is truthy, throwing an error if it's not.
 *
 * This function is designed to be used as a runtime check with TypeScript's
 * assertion type narrowing, allowing the compiler to understand type constraints
 * after the assertion passes.
 *
 * @example
 * function divide(a: number, b: number): number {
 *   assert(b !== 0, "Cannot divide by zero");
 *   // TypeScript now knows b is not 0
 *   return a / b;
 * }
 *
 * @param condition - Condition to check
 * @param message - Error message to throw if condition is falsy
 * @throws Error with the provided message if condition is falsy
 */
export function assert(condition: boolean, message: string): asserts condition {
  if (!condition)
    throw new Error(message)
}
