/**
 * Returns strongly typed array of object keys.
 * Similar to Object.keys() but with better TypeScript type inference.
 *
 * @example
 * const obj = { name: 'John', age: 30 };
 * const keys = objectKeys(obj); // Type: Array<'name' | 'age'>
 *
 * @template T - Object type
 * @param obj - Object to get keys from
 * @returns Array of object keys with proper type information
 */
export function objectKeys<T extends object>(obj: T): Array<`${keyof T & (string | number | boolean | null | undefined)}`> {
  return Object.keys(obj) as Array<`${keyof T & (string | number | boolean | null | undefined)}`>
}
