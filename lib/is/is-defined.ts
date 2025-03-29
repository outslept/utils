/**
 * Checks if a value is defined (not undefined).
 * @param value - Value to check
 * @returns True if value is defined
 */
function isDefined<T = any>(value: T | undefined): value is T {
  return typeof value !== 'undefined'
}

export default isDefined
