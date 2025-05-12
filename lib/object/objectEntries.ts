/**
 * Returns strongly typed array of object entries.
 * Similar to Object.entries() but with better TypeScript type inference.
 *
 * @example
 * const obj = { name: 'John', age: 30 };
 * const entries = objectEntries(obj); // Type: Array<['name' | 'age', string | number]>
 *
 * @template T - Object type
 * @param obj - Object to get entries from
 * @returns Array of [key, value] pairs with proper type information
 */
export function objectEntries<T extends object>(obj: T): Array<[keyof T, T[keyof T]]> {
  return Object.entries(obj) as Array<[keyof T, T[keyof T]]>
}
