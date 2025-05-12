import { isMergeableObject } from "./isMergeableObject"

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
export function deepMerge<T extends object, S extends object>(target: T, source: S): T & S {
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
