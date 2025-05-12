/**
 * Creates a type guard for instances of a specific class.
 *
 * @example
 * const isDate = isInstanceOf(Date);
 * isDate(new Date());  // true
 * isDate('2023-01-01'); // false (string, not Date object)
 *
 * @template T - The class type
 * @param constructor - Class constructor
 * @returns Type guard function for instances of the class
 */
export function isInstanceOf<T>(constructor: new (...args: any[]) => T) {
  return (value: unknown): value is T => value instanceof constructor
}
