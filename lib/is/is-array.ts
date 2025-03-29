/**
 * Checks if a value is an array.
 * @param value - Value to check
 * @returns True if value is an array
 */
function isArray<T = any>(value: unknown): value is Array<T> {
  return Array.isArray(value)
}

export default isArray
