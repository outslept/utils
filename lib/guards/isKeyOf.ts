/**
 * Type guard to check if a key exists in an object.
 *
 * @example
 * const obj = { name: 'John', age: 30 };
 * if (isKeyOf(obj, 'name')) {
 *   console.log(obj[key]); // TypeScript knows key is 'name' | 'age'
 * }
 *
 * @template T - Object type
 * @param obj - Object to check against
 * @param k - Potential key to check
 * @returns True if k is a key of obj, with appropriate type narrowing
 */
export function isKeyOf<T extends object>(obj: T, k: keyof any): k is keyof T {
  return k in obj
}
