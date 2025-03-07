import { isArray, isObject } from './is'

/**
 * Maps an object by applying a transformation function to each key-value pair.
 * The transformation function can return a new key-value pair or undefined to exclude an entry.
 *
 * @example
 * objectMap({ a: 1, b: 2 }, (key, value) => [key.toUpperCase(), value * 2]);
 * // Result: { A: 2, B: 4 }
 *
 * @template K - Type of source object keys
 * @template V - Type of source object values
 * @template NK - Type of target object keys
 * @template NV - Type of target object values
 * @param obj - Source object to transform
 * @param fn - Transformation function that receives key and value and returns new [key, value] pair or undefined
 * @returns New object with transformed keys and values
 * @throws Error if the transformation results in duplicate keys
 */
function objectMap<
  K extends PropertyKey,
  V,
  NK extends PropertyKey,
  NV,
>(
  obj: Record<K, V>,
  fn: (key: K, value: V) => [NK, NV] | undefined,
): Record<NK, NV> {
  const entries = Object.entries(obj) as [K, V][]

  const mappedEntries = entries
    .map(([key, value]) => fn(key, value))
    .filter((entry): entry is [NK, NV] => entry !== undefined)

  const keys = new Set(mappedEntries.map(([k]) => k))
  if (keys.size !== mappedEntries.length) {
    throw new Error('Duplicate keys detected in mapped object')
  }

  return mappedEntries.reduce((acc, [key, value]) => {
    acc[key] = value
    return acc
  }, {} as Record<NK, NV>)
}

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
function isKeyOf<T extends object>(obj: T, k: keyof any): k is keyof T {
  return k in obj
}

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
function objectKeys<T extends object>(obj: T): Array<`${keyof T & (string | number | boolean | null | undefined)}`> {
  return Object.keys(obj) as Array<`${keyof T & (string | number | boolean | null | undefined)}`>
}

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
function objectEntries<T extends object>(obj: T): Array<[keyof T, T[keyof T]]> {
  return Object.entries(obj) as Array<[keyof T, T[keyof T]]>
}

/**
 * Checks if a value is an object that can be merged.
 * Used internally by deepMerge to determine if a property should be recursively merged.
 *
 * @param item - Value to check
 * @returns True if the value is a non-array object
 */
function isMergeableObject(item: any): item is object {
  return isObject(item) && !Array.isArray(item)
}

/**
 * Creates a new object with only the specified keys from the source object.
 *
 * @example
 * objectPick({ a: 1, b: 2, c: undefined }, ['a', 'c']); // { a: 1, c: undefined }
 * objectPick({ a: 1, b: 2, c: undefined }, ['a', 'c'], true); // { a: 1 }
 *
 * @template O - Source object type
 * @template T - Union of keys to pick
 * @param obj - Source object
 * @param keys - Array of keys to include in the result
 * @param omitUndefined - If true, properties with undefined values will be excluded
 * @returns New object with only the specified keys
 */
function objectPick<O extends object, T extends keyof O>(obj: O, keys: T[], omitUndefined = false): Pick<O, T> {
  return keys.reduce((n, k) => {
    if (k in obj) {
      if (!omitUndefined || obj[k] !== undefined)
        n[k] = obj[k]
    }
    return n
  }, {} as Pick<O, T>)
}

/**
 * Removes all properties with undefined values from an object.
 * Modifies the original object.
 *
 * @example
 * clearUndefined({ a: 1, b: undefined, c: 3 }); // { a: 1, c: 3 }
 *
 * @template T - Object type
 * @param obj - Object to modify
 * @returns The same object with undefined properties removed
 */
function clearUndefined<T extends object>(obj: T): T {
  // @ts-expect-error -- ignore
  Object.keys(obj).forEach((key: string) => (obj[key] === undefined ? delete obj[key] : {}))
  return obj
}

/**
 * Safely checks if an object has a specific own property.
 * A safer alternative to obj.hasOwnProperty() that handles null/undefined objects.
 *
 * @example
 * hasOwnProperty({ a: 1 }, 'a'); // true
 * hasOwnProperty({ a: 1 }, 'b'); // false
 * hasOwnProperty(null, 'a');     // false
 *
 * @template T - Object type
 * @param obj - Object to check
 * @param v - Property key to check for
 * @returns True if the object has the property as its own property
 */
function hasOwnProperty<T>(obj: T, v: PropertyKey): boolean {
  if (obj == null) {
    return false
  }

  return Object.hasOwn(obj, v)
}

/**
 * Recursively merges two objects.
 * Properties from source override those in target unless they are objects,
 * in which case they are recursively merged.
 *
 * @example
 * deepMerge({ a: 1, b: { c: 2 } }, { b: { d: 3 }, e: 4 });
 * // Result: { a: 1, b: { c: 2, d: 3 }, e: 4 }
 *
 * @template T - Target object type
 * @template S - Source object type
 * @param target - Target object to merge into
 * @param source - Source object to merge from
 * @returns New object with properties from both objects deeply merged
 */
function deepMerge<T extends object, S extends object>(target: T, source: S): T & S {
  const output = { ...target } as any
  for (const key of Object.keys(source)) {
    const sourceValue = (source as any)[key]
    if (isMergeableObject(sourceValue)) {
      output[key] = key in target && isMergeableObject((target as any)[key])
        ? deepMerge((target as any)[key], sourceValue)
        : sourceValue
    }
    else {
      output[key] = sourceValue
    }
  }
  return output
}

/**
 * Creates a deep copy of an object or array.
 * Handles nested objects and arrays recursively.
 *
 * @example
 * const original = { a: 1, b: { c: 2 } };
 * const clone = deepClone(original);
 * clone.b.c = 3; // Doesn't affect original.b.c
 *
 * @template T - Type of value to clone
 * @param obj - Value to clone
 * @returns Deep copy of the input value
 */
function deepClone<T>(obj: T): T {
  if (!isObject(obj))
    return obj
  if (isArray(obj))
    return obj.map(deepClone) as T

  const clone = {} as T
  for (const key of Object.keys(obj)) {
    // @ts-expect-error -- ignore (FIX LATER)
    clone[key] = deepClone(obj[key])
  }
  return clone
}

export {
  clearUndefined,
  deepClone,
  deepMerge,
  hasOwnProperty,
  isKeyOf,
  isMergeableObject,
  objectEntries,
  objectKeys,
  objectMap,
  objectPick,
}
