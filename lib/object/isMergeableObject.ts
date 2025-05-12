import isObject from "../is/is-object";

/**
 * Checks if a value is an object that can be merged.
 * Used internally by deepMerge to determine if a property should be recursively merged.
 *
 * @param item - Value to check
 * @returns True if the value is a non-array object
 */
export function isMergeableObject(item: any): item is object {
  return isObject(item) && !Array.isArray(item)
}
