/**
 * Checks if a value is undefined.
 * @param value - Value to check
 * @returns True if value is undefined
 */
function isUndefined(value: unknown): value is undefined {
  return typeof value === 'undefined'
}

export default isUndefined
